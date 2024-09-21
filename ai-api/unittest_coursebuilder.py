"""
Code created by Natasya Liew (igotnowifi)
Local unit tests for CourseTree and CSV reading functionality.

This test file is created to validate the core functionalities of the MSSD Course Builder:
- CourseNode: Validates individual nodes within the course tree.
- CourseTree: Verifies that the course tree is built dynamically based on student progress.
- read_programs_csv: Checks the program CSV file reading and correct parsing.
- read_courses_csv: Ensures courses CSV file reading and correct structure of data.
- recommend_courses: Tests that the recommendations are accurate based on path interest, courses taken, and the student's desired number of courses.

"""

import unittest
from coursebuilder import read_programs_csv, read_courses_csv, CourseTree  # Make sure same folder

# Define the file paths
programs_file_path = './programs.csv'
courses_file_path = './courses.csv'

class TestCourseBuilder(unittest.TestCase):

    def test_read_programs_csv(self):
        """
        Test reading programs CSV into a dictionary.
        """
        programs_data = read_programs_csv(programs_file_path)

        # Assert the structure of programs_data
        self.assertIsInstance(programs_data, dict)
        self.assertIn('MSSD', programs_data)
        self.assertIn('core_courses', programs_data['MSSD'])
        self.assertEqual(programs_data['MSSD']['core_courses'], ['521', '526'])

    def test_read_courses_csv(self):
        """
        Test reading courses CSV into a dictionary.
        """
        courses_data = read_courses_csv(courses_file_path)

        # Assert the structure of courses_data
        self.assertIsInstance(courses_data, dict)
        self.assertIn('673', courses_data)
        self.assertIn('course_name', courses_data['673'])
        self.assertEqual(courses_data['673']['course_name'], 'Software Engineering')

    def test_course_tree_recommendation(self):
        """
        Test the CourseTree class by simulating a student's course progress and path interest.
        """
        course_taken = ['521', '633', '673']  # Courses already taken
        path_interest = 'AI/ML'  # Student's elective path of interest
        course_to_take = 5  # Number of courses to take next semester

        # Create a CourseTree object
        course_tree = CourseTree()

        # Get recommended courses
        recommended_courses = course_tree.recommend_courses(course_taken, path_interest, course_to_take)

        # Assert that we receive the correct number of recommendations
        self.assertEqual(len(recommended_courses), course_to_take)
        self.assertIn(655, recommended_courses)  # Core course 655 should be recommended
        self.assertIn(677, recommended_courses)  # AI/ML elective 677 should be recommended if not taken

    def test_course_tree_structure(self):
        """
        Test the construction of the course tree structure and ensure it's building correctly.
        """
        course_taken = ['521', '526']  # Courses already taken
        path_interest = 'web development'
        
        # Create the CourseTree and build it
        course_tree = CourseTree()
        course_tree.build_mssd_tree(course_taken, path_interest)

        # Display the tree and check if it's built properly
        self.assertIsNotNone(course_tree.root)
        self.assertEqual(course_tree.root.course_id, 526)  # Root should start with the next course in branch
        self.assertEqual(len(course_tree.root.children), 1)  # Only one branch should continue after the root

# Run the tests
if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False, verbosity=2)

