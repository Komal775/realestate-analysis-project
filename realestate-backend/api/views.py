from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import os

# Path to Excel file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILE_PATH = os.path.join(BASE_DIR, "api", "data", "realestate.xlsx")

@api_view(["POST"])
def analyze(request):
    try:
        query = request.data.get("query", "").strip()

        if not query:
            return Response({"error": "Query is required"}, status=400)

        # Extract last word as location
        parts = query.lower().split()
        location = parts[-1].capitalize()

        # Read Excel
        df = pd.read_excel(FILE_PATH)

        # Normalize column names
        df.columns = (
            df.columns
            .str.strip()
            .str.lower()
            .str.replace("–", "-", regex=False)
            .str.replace("—", "-", regex=False)
            .str.replace("  ", " ")
        )

        # Auto-detect correct flat rate column
        flat_rate_col = None
        for col in df.columns:
            if "flat" in col and "average" in col and "rate" in col:
                flat_rate_col = col
                break

        if flat_rate_col is None:
            return Response({"error": "Could not detect flat rate column in Excel file."})

        # Auto-detect demand column
        demand_col = None
        for col in df.columns:
            if "total units" in col or ("demand" in col):
                demand_col = col
                break

        if demand_col is None:
            return Response({"error": "Could not detect demand column in Excel file."})

        # Auto-detect final location column
        location_col = None
        for col in df.columns:
            if "final location" in col or col == "location":
                location_col = col
                break

        if location_col is None:
            return Response({"error": "Could not detect location column in Excel file."})

        # Filter by location
        filtered = df[df[location_col].str.lower() == location.lower()]

        if filtered.empty:
            return Response({"error": f"No data found for {location}."})

        # Prepare result table
        result_table = []
        years = []
        flat_rates = []

        for _, row in filtered.iterrows():
            flat_rate = float(row[flat_rate_col])
            demand = float(row[demand_col])
            year = int(row["year"])

            years.append(year)
            flat_rates.append(flat_rate)

            result_table.append({
                "location": row[location_col],
                "year": year,
                "city": row["city"],
                "flat_rate": flat_rate,
                "demand": demand,
            })

        # Summary
        avg_price = round(filtered[flat_rate_col].mean(), 2)
        avg_demand = round(filtered[demand_col].mean(), 2)

        summary_text = (
            f"Analysis for {location}: "
            f"Average price = {avg_price}. "
            f"Average demand = {avg_demand}."
        )

        # Chart data
        chart_data = {
            "labels": years,
            "values": flat_rates
        }

        return Response({
            "locality": location,
            "summary": summary_text,
            "chart": chart_data,
            "table": result_table
        })

    except Exception as e:
        return Response({"error": str(e)}, status=500)
