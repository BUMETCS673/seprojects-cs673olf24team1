CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    _name VARCHAR(255) NOT NULL,
    description TEXT,
    pledged_amount DECIMAL NOT NULL
);