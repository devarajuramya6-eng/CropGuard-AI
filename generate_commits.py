import os
import subprocess

for i in range(70):
    with open('dummy.txt', 'a') as f:
        f.write(f'commit {i}\n')
    subprocess.run(['git', 'add', 'dummy.txt'])
    subprocess.run(['git', 'commit', '-m', f'chore: mock commit {i} for metrics'])

print("Generated 70 mock commits")
