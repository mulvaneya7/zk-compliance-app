# Trustless Due Diligence  
## Zero-Knowledge Proof Compliance for Mergers & Acquisitions

This repository contains a prototype implementation of a privacy-preserving compliance verification system designed for merger and acquisition (M&A) due diligence.

The system demonstrates how regulatory assertions can be verified **without exposing underlying customer data**, using a cryptographic proof-based approach.

---

## 📌 Project Overview

Traditional due diligence workflows require organizations to disclose sensitive customer and financial data to external parties. This introduces:

- Extended transaction timelines  
- Increased legal and audit costs  
- Significant data privacy risks  

This project reframes compliance verification as a **proof problem rather than a data-sharing problem**.

---

## ⚙️ v0.1 Prototype (Current)

This version provides a **lightweight, containerized demonstration** of the core concept.

### Features

- Synthetic customer dataset generation  
- PEP (Politically Exposed Person) exposure calculation  
- Threshold-based compliance verification (`< 5%`)  
- Simulated proof generation (hash-based placeholder)  
- Mock ledger anchoring (stand-in for blockchain integration)  
- Auditor-facing verification output  

### Key Concept Demonstrated

> A compliance condition can be verified using **derived proof artifacts**, without revealing raw records.

---

## 🚫 Limitations (v0.1)

This prototype intentionally uses simplified stand-ins:

- ❌ No real zero-knowledge proof system (Circom/SnarkJS planned)  
- ❌ No confidential computing (simulated execution boundary)  
- ❌ No distributed ledger (mock ledger reference only)  

These components are part of the planned system architecture and will be introduced in future versions.

---

## 🧪 Run the Demo

### Option 1: Docker (Recommended)

```bash
docker build -t zk-compliance-app .
docker run --rm -p 5173:5173 zk-compliance-app
