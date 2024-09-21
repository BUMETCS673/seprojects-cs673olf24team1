import random
from fastapi import APIRouter, FastAPI, Request
from entities import StudentInfo
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain.schema import AIMessage, HumanMessage

# Define the API Router for organizing routes
router = APIRouter()

class CourseNode:
    def __init__(self, course_id):
        self.course_id = course_id
        self.children = []

    def add_child(self, child_node):
        self.children.append(child_node)

    def __repr__(self):
        return f"{self.course_id} -> {[child.course_id for child in self.children]}"


class CourseTree:
    def __init__(self):
        self.root = None

    def add_branch(self, branch, course_taken, skip_courses=None):
        """
        Adds a branch to the tree, skipping courses already taken and any optional skip courses.
        """
        # If the root is not set, initialize it with the first course
        if not self.root:
            self.root = CourseNode(branch[0])  # Initialize the root with the first course
            current_node = self.root
        else:
            # If the root is set, check if the first course in the branch is already the root
            if self.root.course_id == branch[0]:
                current_node = self.root
            else:
                # If the first course in the branch is not the root, find it or add it
                current_node = CourseNode(branch[0])
                self.root.add_child(current_node)

        # Process the remaining courses in the branch
        for course_id in branch[1:]:
            if course_id in course_taken or (skip_courses and course_id in skip_courses):
                # Skip adding this course if already taken or it's a course we need to skip
                continue

            # Check if the node already exists
            child_node = next((child for child in current_node.children if child.course_id == course_id), None)
            if not child_node:
                # Create new node if not present
                child_node = CourseNode(course_id)
                current_node.add_child(child_node)
            current_node = child_node  # Move down to the next course


    def convert_course_taken_to_int(self, course_taken):
        """
        Convert all course IDs in the course_taken list from strings to integers.
        """
        return [int(course) for course in course_taken]

    def build_mssd_tree(self, course_taken, path_interest):
        """
        Builds the MSSD course tree dynamically based on the courses already taken and path interest.
        - Skips 673 if 682 is taken, and vice versa.
        - Adds only the necessary electives to reach 3 electives in total.

        Notes to Developer/self:
        - When adding other MS degree in the CS degree, don't forget to change the exceptions and course number
        - For certification, need to make new type of tree (but simpler, use the earlier branch method)
        """
        # Convert course_taken to integer IDs
        course_taken = self.convert_course_taken_to_int(course_taken)

        # Convert path_interest to lower case for case insensitivity
        path_interest = path_interest.lower()

        # Define elective list for easier detection
        elective_list = [601, 602, 633, 634, 664, 677, 683, 701, 763, 767]

        # Start by defining the main branches
        branches = []

        # Define branch sequences for 521 and 526
        ## Note: Low annoyance, but should be steady now.
        if 521 in course_taken and 526 in course_taken:
            #print("Both 521 and 526 taken. Skipping both.")
            branches = []  # Skip both 521 and 526
        elif 521 in course_taken:
            #print("521 taken, recommending 526.")
            branches = [[526]]  # Recommend 526
        elif 526 in course_taken:
            #print("526 taken, recommending 521.")
            branches = [[521]]  # Recommend 521
        else:
            #print("Neither 521 nor 526 taken, adding both branches.")
            branches = [
                [521, 526],  # Branch 1: 521 -> 526
                [526, 521]   # Branch 2: 526 -> 521
            ]

        # Add the branches (core sequence)
        for branch in branches:
            self.add_branch(branch, course_taken)

        # Step 1: Choose the appropriate core based on path_interest and course_taken
        core_options = {
            'web development': [[622, 655, 673], [673, 622, 655],[622, 673, 655]],
            'secure software development': [[622, 655, 673], [673, 622, 655],[622, 673, 655]],
            'app development': [[622, 655, 673], [673, 622, 655],[622, 673, 655]],
            'ai/ml': [[622, 655, 682], [682, 622, 655],[622, 682, 655]],
            'data science': [[622, 655, 682], [682, 622, 655],[622, 682, 655]]
        }

        # Debugging output
        #print(f"Courses taken: {course_taken}")

        # FIXED: now can detect if took 673 or 682, and if have not can detect based on path_interest
        if 673 in course_taken or 682 in course_taken:
            #print("Both 673 and 682 are in course_taken. Skipping both.")
            core_sequence = [622, 655]  # Skip both '673' and '682'
        else:
            # Choose core sequence based on interest and path
            #print("Choosing core sequence based on path_interest.")
            core_sequence = random.choice(core_options.get(path_interest, []))


        # Add the core sequence to the tree
        self.add_branch(core_sequence, course_taken)

        # Step 2: Add electives based on path_interest, but only up to 3 total electives
        elective_paths = {
            'web development': [[601, 602, 701]],
            'ai/ml': [[664, 677, 767], [677, 644, 767], [677, 767, 664]],
            'data science': [[669, 677, 767], [677, 669, 767], [677, 767, 669]],
            'secure software development': [[633, 634, 763], [634, 633, 763], [763, 633, 634], [763, 634, 633]],
            'app development': [[683, 601, 602], [601, 683, 602], [601, 602, 683]]
        }

        # Detect electives already taken from course_taken
        electives_taken = [course for course in course_taken if course in elective_list]

        # Debugging output for electives
        #print(f"Electives already taken: {electives_taken}")

        # Calculate how many more electives are needed to reach 3
        remaining_electives = 3 - len(electives_taken)

        if remaining_electives > 0:
            # Debugging output for remaining electives
            #print(f"Remaining electives to add: {remaining_electives}")
            # Randomly choose a sequence from the elective path options
            chosen_sequence = random.choice(elective_paths.get(path_interest, []))
            #print(f"Chosen elective sequence: {chosen_sequence}")


            electives_to_add = [course for course in chosen_sequence if course not in course_taken]

            # Apply specific prerequisite rules
            if 677 not in course_taken and 677 in electives_to_add:
                electives_to_add = [course for course in electives_to_add if course != 767]

            if 601 not in course_taken and 601 in electives_to_add:
                electives_to_add = [course for course in electives_to_add if course != 602]

            #print(f"Electives to add (after prerequisite checks): {electives_to_add}")


            # FIXED: Jesus Christ! HIGH ANNOYANCE, careful when replicate for other MS degree.
            # Add electives to tree, ensuring we fill up to 3 electives if needed
            for elective in electives_to_add[:remaining_electives]:
                #print(elective)
                self.add_branch([elective], course_taken)  # Add each elective individually
                #print(branches)

    def recommend_courses(self, course_taken, path_interest, course_to_take):
        """
        Recommend the next set of courses based on the student's taken courses, elective interest,
        and how many courses they want to take in the next semester.
        """
        self.recommended_courses = []  # Reset recommended courses list

        # Step 1: Build the tree with course_taken
        self.build_mssd_tree(course_taken, path_interest)

        # Step 2: Traverse the tree and recommend up to 'course_to_take' number of courses
        def traverse_tree(node):
            if node.course_id not in course_taken and node.course_id not in self.recommended_courses:
                self.recommended_courses.append(node.course_id)
            for child in node.children:
                traverse_tree(child)

        if self.root:
            traverse_tree(self.root)

        # If more courses needed, fill with ''
        if len(self.recommended_courses) < course_to_take:
            self.recommended_courses.extend([''] * (course_to_take - len(self.recommended_courses)))

        return self.recommended_courses[:course_to_take]

    def display_tree(self, node=None, level=0):
        if node is None:
            node = self.root
        print("  " * level + f"{node.course_id}")
        for child in node.children:
            self.display_tree(child, level + 1)


@router.post("/course_tree")
async def recommend_courses(request: Request, student_info: StudentInfo):
    # Store student data in app state
    request.app.state.student_data[student_info.user_id] = student_info
    
    session_id = student_info.user_id
    tree = CourseTree()
    course_list = tree.recommend_courses(course_taken=student_info.course_taken,
                           path_interest=student_info.path_interest,
                           course_to_take=student_info.course_to_take)
    
    prefixed_courses = [f'CS{course}' for course in course_list]
    courses_string = ', '.join(prefixed_courses)
    
    response = f"""
    Hello {student_info.student_name}, based on the details on the courses you've taken, your program, and selected number of courses to take this semester, these are the recommended courses for your to take: {courses_string}. Would you like more information about your recommended courses, or would you like to learn about other courses in the program.
    """
    
    store = request.app.state.chat_history
    if session_id not in store:
        # Initialize new message history
        store[session_id] = InMemoryChatMessageHistory()
    
    message = AIMessage(content=response)
    store[session_id].add_message(message)
    
    return {"response" : response}