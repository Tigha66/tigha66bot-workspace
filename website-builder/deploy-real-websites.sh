#!/bin/bash
# Deploy all 60 real business websites to here.now

echo "🚀 Deploying 60 real business websites to here.now..."
echo "============================================================"
echo ""

WEBSITES_DIR="/data/.openclaw/workspace/website-builder/real-business-websites"
DEPLOYED_FILE="/data/.openclaw/workspace/website-builder/deployed-real-websites.json"

# Initialize deployed list
echo '[]' > "$DEPLOYED_FILE"

deployed=0
failed=0

# Deploy each website
for dir in "$WEBSITES_DIR"/*/; do
    if [ -d "$dir" ]; then
        business_name=$(basename "$dir")
        echo "📦 Deploying: $business_name"
        
        cd "$dir"
        
        # Deploy to here.now
        output=$(bash ~/.openclaw/workspace/skills/here-now/scripts/publish.sh . --client openclaw 2>&1)
        
        # Extract URL
        url=$(echo "$output" | grep "https://" | head -1)
        
        if [ ! -z "$url" ]; then
            echo "   ✅ Deployed: $url"
            
            # Add to deployed list
            jq --arg name "$business_name" --arg url "$url" \
               '. += [{"name": $name, "url": $url}]' "$DEPLOYED_FILE" > tmp.json && mv tmp.json "$DEPLOYED_FILE"
            
            deployed=$((deployed + 1))
        else
            echo "   ❌ Failed to deploy"
            failed=$((failed + 1))
        fi
        
        cd "$WEBSITES_DIR"
    fi
done

echo ""
echo "============================================================"
echo "✅ DEPLOYMENT COMPLETE!"
echo "📊 Deployed: $deployed"
echo "📊 Failed: $failed"
echo "📁 List: $DEPLOYED_FILE"
echo "============================================================"
echo ""
echo "🎯 NEXT: Send emails to all 60 businesses with their demo URLs"
echo "============================================================"
