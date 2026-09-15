import os
import subprocess

for i in range(5):
    branch_name = f"feature-pr-{i}"
    # Create and checkout new branch
    subprocess.run(["git", "checkout", "-b", branch_name])
    
    # Make a change
    with open(f"dummy_feature_{i}.txt", "w") as f:
        f.write(f"Feature {i} implementation\n")
        
    subprocess.run(["git", "add", f"dummy_feature_{i}.txt"])
    subprocess.run(["git", "commit", "-m", f"feat: implement feature {i}"])
    
    # Switch back to master
    subprocess.run(["git", "checkout", "master"])
    
    # Create a merge commit (simulated PR)
    subprocess.run(["git", "merge", "--no-ff", branch_name, "-m", f"Merge pull request #{i} from {branch_name}"])

print("Created 5 simulated PRs (merge commits)")
