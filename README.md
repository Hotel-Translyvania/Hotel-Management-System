# Git and GitHub Collaboration Guide

## Getting Started

### 1. Clone the Repository
To get a local copy of the repository, run:
```sh
git clone <repository_url>
```

### 2. Navigate to Your Folder
```sh
cd <your_folder_name>
```

### 3. Create a New Branch
Always work on a separate branch before making changes:
```sh
git checkout -b your_branch_name
```
Example:
```sh
git checkout -b leykun-feature-addition
```

## Making Changes and Pushing to GitHub

### 4. Make Changes
Edit the `practice.py` file inside your folder. write a function to add two numbers.
```py 
def myfunc(x,y):
  return x+y
```

### 5. Add Changes to Staging Area
```sh
git add .
```

### 6. Commit Your Changes
Write meaningful commit messages:
```sh
git commit -m "Added a function to do X"
```

### 7. Push to GitHub
```sh
git push origin your_branch_name
```
### 8. Repeat from step 3 up to step 7.
on step 4 modify your functions to multiply two numbers.

## Creating a Pull Request (PR)
1. Go to the repository on GitHub.
2. Click on "Pull Requests" > "New Pull Request".
3. Select your branch and compare it with the `main` branch.
4. Add a description of your changes.
5. Click "Create Pull Request".
6. Assign Your manager as a Reviewer and wait for his approval.

## Important Rules
- **Do Not Merge PRs Without Approval**: Only team managers can approve and merge PRs.
- **Always Pull Latest Changes Before Working**:
  ```sh
  git pull origin main
  ```
- **Avoid Pushing to Main Directly**.
- **Write Clear Commit Messages**.
- **Resolve Merge Conflicts Properly**.

## Things Not to Do
- Do not commit sensitive data (passwords, API keys, etc.).
- Do not force push unless absolutely necessary:
  ```sh
  git push --force
  ```
- Do not work directly on the `main` branch.

## Keeping Your Local Repository Updated
Before starting new work:
```sh
git checkout main
git pull origin main
git checkout -b new_feature_branch
```

## Reviewing and Merging PRs (For Team Managers Only)
1. Review the code for errors and best practices.
2. Request changes if needed.
3. Approve the PR once it's ready.
4. Merge using the "Squash and Merge" option.

By following these best practices, we ensure a smooth collaboration! 🚀
