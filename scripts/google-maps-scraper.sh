#!/bin/bash
# Google Maps Scraper for Businesses Without Websites
# Uses agent-browser to automate Google Maps searches

# Usage: ./google-maps-scraper.sh "search query" "city" [num_results]

QUERY="$1"
CITY="$2"
LIMIT="${3:-20}"

echo "🔍 Searching Google Maps for: $QUERY in $CITY"
echo "Target: $LIMIT businesses"

# Open Google Maps
agent-browser open "https://www.google.com/maps/search/${QUERY}+${CITY}"

# Wait for page load
sleep 3

# Get initial snapshot
agent-browser snapshot -i

# Note: This script needs refinement based on actual page structure
# Google Maps uses dynamic loading, so we need to:
# 1. Scroll to load more results
# 2. Click on each business
# 3. Check if website link exists
# 4. Extract: name, phone, address, website (if any)

echo "📋 Next steps:"
echo "1. Scroll down to load more businesses"
echo "2. Click each business to view details"
echo "3. Check for website link"
echo "4. Extract contact info for businesses without websites"
