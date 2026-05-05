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
## Architecture Overview

flowchart LR

    A[Organization Internal Data\n(Customer Records)] --> B[Confidential Execution Environment\n(Simulated in v0.1)]

    B --> C[Compliance Logic\nPEP < 5% Threshold Check]

    C --> D[Proof Generation\n(ZK Proof - Simulated v0.1)]

    D --> E[Proof Artifact\n(Hash + Public Claim)]

    E --> F[Ledger Anchor\n(Mock Ledger v0.1)]

    E --> G[Auditor / Verifier]

    G --> H[Verification Result\n(Valid / Invalid)]

    subgraph Private Boundary
        A
        B
        C
    end

    subgraph Public / Shared
        D
        E
        F
        G
        H
    end
---

## 🧪 Run the Demo

### Option 1: Docker (Recommended)

```bash
docker build -t zk-compliance-app .
docker run --rm -p 5173:5173 zk-compliance-app

Open in your browser:

http://localhost:5173

---

### Local Development

```bash
npm install
npm run dev
```

---

## System Architecture (Planned)

The full system architecture will integrate:

- Zero-Knowledge Proofs (ZKPs) for compliance verification  
- Confidential Computing (AWS Nitro / Azure confidential VMs)  
- Permissioned Distributed Ledger (Hyperledger Fabric)  

These components enable:

- Verification without disclosure  
- Secure execution of sensitive computations  
- Tamper-resistant audit trails  

---

## Research Objective

To evaluate whether modern cryptographic and cloud-based techniques can:

- Reduce reliance on data-sharing in compliance workflows  
- Improve privacy guarantees in M&A due diligence  
- Maintain verifiability under regulatory constraints  

---

## Demonstrated Use Case

Verification of the regulatory condition:

Fewer than 5% of customer accounts are associated with politically exposed persons (PEPs)

This condition is evaluated without exposing individual customer records.

---

## Roadmap

v0.2
- Implement real ZK proof circuit (Circom / SnarkJS)

v0.3
- Add proof verification layer  
- Replace simulated proof artifacts  

v0.4
- Introduce confidential execution environments  

v0.5
- Integrate distributed ledger (Hyperledger Fabric)  

v1.0
- Full end-to-end privacy-preserving compliance system  

---

## Author

Alex Mulvaney  
California State University, Fullerton  

---

## License

This project is for academic and research purposes.