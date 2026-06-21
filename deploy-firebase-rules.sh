#!/bin/bash

# Deploy Firebase Firestore Rules
echo "Deploying Firebase Firestore Security Rules..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Deploy the rules
firebase deploy --only firestore:rules

echo "Firebase rules deployed successfully!"
