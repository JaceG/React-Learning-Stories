#!/bin/bash

# List of learning paths that have NARRATIVE_REWRITE.md files
paths_with_rewrites=(
    "components-basics"
    "forms-events"
    "hooks-in-action"
    "props-data-flow"
    "routing-navigation"
    "state-management"
)

notice="# ⚠️ NOTICE: THIS SCRIPT IS OUTDATED ⚠️
# Please use NARRATIVE_REWRITE.md instead for the current lesson content.
# This file is kept for historical reference only.

"

for path in "${paths_with_rewrites[@]}"; do
    script_file="src/learning-paths/$path/NARRATIVE_SCRIPT.md"
    
    if [ -f "$script_file" ]; then
        # Check if notice already exists
        if ! grep -q "NOTICE: THIS SCRIPT IS OUTDATED" "$script_file"; then
            echo "Adding notice to $script_file"
            # Create temp file with notice + original content
            echo "$notice" > temp_file.md
            cat "$script_file" >> temp_file.md
            mv temp_file.md "$script_file"
        else
            echo "Notice already exists in $script_file"
        fi
    fi
done

echo "Done updating outdated scripts."