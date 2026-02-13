# System Architecture

Status: Frozen  
Phase: 2  

---

## Overview

TRUSTLENS is an API-first asynchronous content trust analysis system.

It evaluates observable trust-risk signals without determining factual truth.

---

## High-Level Flow

User → Frontend → Backend API → Job Queue → Signal Workers → MongoDB → Aggregation → Report

---

## Core Components

### 1. Frontend (React + Vite)

Responsibilities:
- Accept text or URL input
- Display job status
- Render trust report

Non-responsibilities:
- No signal computation
- No aggregation logic

---

### 2. Backend API (Node.js + Express)

Responsibilities:
- Authentication (JWT)
- Input validation
- Content normalization
- Job creation
- Result retrieval
- Aggregation orchestration

---

### 3. Job Queue Layer

Purpose:
Execute trust signals asynchronously.

Options:
- BullMQ + Redis (preferred if free)
- In-memory queue (fallback)

Async execution prevents blocking API requests.

---

### 4. Signal Workers

Each trust signal:
- Runs independently
- Receives normalized text
- Returns value + explanation + limitations
- Handles failures gracefully

No signal depends on another signal.

---

### 5. MongoDB (Atlas Free Tier)

Stores:
- Users
- Analysis Jobs
- Signal Results
- Aggregated Results

Design principles:
- Immutable signal records
- User-scoped queries
- Indexed for history retrieval

---

## Design Guarantees

- No black-box AI
- No external paid APIs
- No truth claims
- Conservative aggregation
- Fully explainable outputs

---

## Out of Scope

- Real-time global monitoring
- Political content classification
- Social network analysis
- External dataset enrichment
