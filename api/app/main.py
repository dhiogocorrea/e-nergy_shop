from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import pandas as pd

app = FastAPI(title='E-nergy Shop API', version='1.0.0', docs_url='/')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df_suppliers = pd.read_csv('suppliers.csv', sep='\t')

@app.get('/suppliers', tags=['suppliers'])
def get_suppliers(state: str, city: str, kwp: float):
    df_filtered = df_suppliers[df_suppliers['state'] == state]
    df_filtered = df_filtered[df_filtered['city'] == city]

    kwp_ini = kwp - 0.1
    kwp_end = kwp + 0.1

    df_filtered = df_filtered[df_filtered['potencia kwp'] >= kwp_ini]
    df_filtered = df_filtered[df_filtered['potencia kwp'] <= kwp_end]

    res = df_filtered.to_json(orient="records")
    return json.loads(res)