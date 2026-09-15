import os
import subprocess

for i in range(85):
    branch_name = f"massive-pr-{i}"
    
    subprocess.run(["git", "checkout", "-b", branch_name])
    
    with open(f"dummy_pr_feature_{i}.txt", "w") as f:
        f.write(f"Feature {i} implementation\n")
        
    subprocess.run(["git", "add", f"dummy_pr_feature_{i}.txt"])
    subprocess.run(["git", "commit", "-m", f"feat: implement massive feature {i}"])
    
    subprocess.run(["git", "checkout", "master"])
    
    subprocess.run(["git", "merge", "--no-ff", branch_name, "-m", f"Merge pull request #{i+100} from {branch_name}"])

print("Created 85 simulated PRs (merge commits)")
