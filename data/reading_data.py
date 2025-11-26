import pandas as pd
import os
from dotenv import load_dotenv

# --- 1. Load Credentials from .env File ---
load_dotenv()
aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")
s3_region = "ap-south-1"  # Your bucket's region
bucket_name = "pharma-project-bucket"

# --- 2. Define the path to your final data file in S3 ---
s3_file_path = "ml_data/inventory_forecasting_pandas/processed_sales_data.parquet"
full_s3_uri = f"s3://{bucket_name}/{s3_file_path}"

# --- 3. Read the Parquet file directly from S3 into a Pandas DataFrame ---
print(f"--- Reading data from: {full_s3_uri} ---")
try:
    # Pandas needs these storage options to authenticate with S3
    storage_options = {
        "key": aws_access_key_id,
        "secret": aws_secret_access_key,
        "client_kwargs": {"region_name": s3_region}
    }
    
    df = pd.read_parquet(full_s3_uri, storage_options=storage_options)

    # --- 4. Print the data ---
    print("\n✅ Successfully read data from S3. Here are the first 10 rows:")
    print(df.head(10))

    print("\n--- DataFrame Info ---")
    df.info()

except Exception as e:
    print(f"\n❌ ERROR: Could not read the file from S3.")
    print(f"   Please check the file path and your IAM permissions.")
    print(f"   Details: {e}")
