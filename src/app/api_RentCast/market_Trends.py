import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

# Replace with your actual Rent Cast API key
API_KEY = os.getenv("API_KEY")
BASE_URL = os.getenv("BASE_URL")
ZIP_CODE = os.getenv("ZIP_CODE")

# Example function to get property rental estimates
def get_properties(zipCode):
    url = f"{BASE_URL}/markets"
    headers = {
        'Accept': 'application/json',
        'X-Api-Key': API_KEY,
    }
    params = {
        # "address": address,  # The address you're looking up
        # "city": city,
        # "state": state,
        "zipCode": zipCode,
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors
        data = response.json()
        return data  # Parsed JSON response
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None

# Example usage
if __name__ == "__main__":
    # address = "10604 Blythe Avenue Los Angeles, CA 90064"
    markets = get_properties(ZIP_CODE)
    if markets:
        pretty_marketData = json.dumps(markets, indent=4)
        print("Markets:")
        print(pretty_marketData)
    else:
        print("Failed to retrieve rental estimates.")