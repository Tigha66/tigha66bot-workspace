#!/usr/bin/env python3
"""Collect and organize business data from Oxylabs searches."""
import json
import csv
import os

# Business data collected from searches
businesses = []

def add_business(name, phone, address, city, email, website, industry, website_status="Good"):
    """Add a business to the list."""
    businesses.append({
        "Business Name": name,
        "Phone": phone,
        "Email": email or "",
        "City": city,
        "Industry": industry,
        "Website Status": website_status,
        "Website URL": website or "",
        "Priority": "High" if website_status == "None" else "Medium" if website_status == "Outdated" else "Low",
        "Demo Website URL": ""
    })

# Plumbers from Manchester
add_business("AD Plumbing Heating and Electrical", "07500002379", "220 Kingsway", "Manchester", "contact@plumbingmanchester.co.uk", "https://plumbingmanchester.co.uk", "Plumber", "Good")
add_business("QuickServe Plumbing", "0161 826 6000", "7 Bury New Road, Prestwich", "Manchester", "info@qsplumbing.co.uk", "https://qsplumbing.co.uk", "Plumber", "Good")
add_business("Our Plumber Manchester", "07854089831", "", "Manchester", "ourplumberuk@outlook.com", "", "Plumber", "None")
add_business("Plumbic", "+447824054079", "39 Ruskin Avenue", "Manchester", "info@plumbic.co.uk", "https://plumbic.co.uk", "Plumber", "Good")

print(f"Collected {len(businesses)} businesses so far...")
print("Continue adding more from search results...")
