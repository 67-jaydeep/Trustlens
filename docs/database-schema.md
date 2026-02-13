# MongoDB Schema & Indexing Strategy

Status: Frozen  
Phase: 2  

---

## Collections

### users

Fields:
- email (unique)
- passwordHash
- createdAt
- lastLoginAt

Index:
- unique index on email

---

### analysis_jobs

Fields:
- userId
- inputType
- originalInput
- normalizedTextHash
- status
- signalVersion
- meta (wordCount, sentenceCount)
- createdAt
- completedAt

Indexes:
- { userId, createdAt }
- { status }

---

### signal_results

Fields:
- jobId
- signalId
- signalVersion
- status
- value
- explanation
- limitations
- executionTimeMs
- error (if failed)
- createdAt

Indexes:
- { jobId }
- { jobId, signalId } (unique)

---

### aggregated_results

Fields:
- jobId
- overallRiskBand
- overallScore
- groupScores
- conflicts
- notes
- createdAt

Index:
- { jobId } (unique)

---

## Design Principles

- Immutable signal results
- Separation of raw & aggregated data
- Indexed for user history
- Free-tier compatible
