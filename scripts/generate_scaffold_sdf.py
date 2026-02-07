"""
Generate 3D SDF files for alpha-synuclein PET tracer scaffolds.

Scaffolds:
  BV-21    — benzo[d]thiazol-2-amine core
  TZ61-84  — 2-arylbenzothiazole with iodine
  BF-2846  — pyridazino[4,5-b]indol-4-amine

Run in rdkit conda env:
  conda run -n rdkit python scripts/generate_scaffold_sdf.py
"""

import os
from rdkit import Chem
from rdkit.Chem import AllChem

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SDF_DIR = os.path.join(SCRIPT_DIR, "frames", "sdf")

MOLECULES = {
    "BV-21": "IC1=CC=C(C2=NOC(NC(C3=CC=C(OC)C=C3)=O)=C2)C=C1",
    "TZ61-84": "I/C=C/COC1=CC=C(N=C(NC2=CN=C(OC)C=C2)C=C3)C3=C1",
    "BF-2846": "O=C(NC1=CC=C(N2CCN(C3=CC=CC=N3)CC2)C=C1)C4=CC=C(OC)C=C4",
}


def generate_sdf(name: str, smiles: str):
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        raise ValueError(f"Invalid SMILES for {name}: {smiles}")

    mol = Chem.AddHs(mol)

    params = AllChem.ETKDGv3()
    params.randomSeed = 42
    status = AllChem.EmbedMolecule(mol, params)
    if status != 0:
        raise RuntimeError(f"Embedding failed for {name}")

    AllChem.MMFFOptimizeMolecule(mol, maxIters=500)

    output_path = os.path.join(SDF_DIR, f"{name}.sdf")
    writer = Chem.SDWriter(output_path)
    writer.write(mol)
    writer.close()
    print(f"  {name} → {output_path}")


def main():
    os.makedirs(SDF_DIR, exist_ok=True)
    print("Generating 3D SDF files...")
    for name, smiles in MOLECULES.items():
        generate_sdf(name, smiles)
    print("Done!")


if __name__ == "__main__":
    main()
