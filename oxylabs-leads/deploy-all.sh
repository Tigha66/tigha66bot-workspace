#!/bin/bash
# Deploy all websites to here.now

cd /data/.openclaw/workspace/oxylabs-leads/built-websites

# Create a master deployment folder
mkdir -p /tmp/herenow-deploy

# Counter
count=0
total=36

echo "Starting deployment of $total websites to here.now..."
echo ""

# Deploy each website
for file in *.html; do
    count=$((count + 1))
    slug_base=$(basename "$file" .html)
    
    # Create temp directory for this site
    deploy_dir="/tmp/herenow-deploy/$slug_base"
    mkdir -p "$deploy_dir"
    
    # Copy HTML as index.html
    cp "$file" "$deploy_dir/index.html"
    
    echo "[$count/$total] Deploying $slug_base..."
    
    # Deploy to here.now
    cd /data/.openclaw/workspace/skills/here-now
    result=$(./scripts/publish.sh "$deploy_dir" --client openclaw 2>&1)
    
    # Extract URL from result
    url=$(echo "$result" | grep -oP 'https://[a-z0-9-]+\.here\.now/?' | head -1)
    
    if [ -n "$url" ]; then
        echo "  ✓ Deployed: $url"
        echo "$slug_base|$url" >> /data/.openclaw/workspace/oxylabs-leads/deployment-results.txt
    else
        echo "  ✗ Failed to deploy $slug_base"
        echo "$slug_base|FAILED" >> /data/.openclaw/workspace/oxylabs-leads/deployment-results.txt
    fi
    
    cd /data/.openclaw/workspace/oxylabs-leads/built-websites
done

echo ""
echo "==================================="
echo "Deployment complete!"
echo "Results saved to: deployment-results.txt"
echo "==================================="
