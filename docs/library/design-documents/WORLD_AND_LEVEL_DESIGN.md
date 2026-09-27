# World and Level Design Documents

## World Bible

No standalone canonical World Bible file has yet been located.

Until one is assembled, current canon should be resolved from:

1. explicit current canon decisions
2. `knowledge/PROJECT_2088.md`
3. current GDD
4. current RWE world records
5. approved narrative/dialogue work
6. legacy notes only where not contradicted

## Current level-design authority

GDD v0.4 introduced the authored-space / procedural-situation model.

GDD v0.5 expands it into Living Regions.

### Area Traversal Graph

The ATG describes authored geography through:

- Cells/junctions
- strongpoints
- towns
- gates/chokepoints
- hidden/underground routes
- critical infrastructure
- Encounter Pins
- route families A/B/C
- crosslinks

### Core rule

**Authored geography. Systemic occupancy. Optional engagement. Persistent consequence.**

### Region model

Current direction:

```text
Region
└── Location
    └── Cells / Areas
        ├── authored traversal
        ├── infrastructure
        ├── state
        ├── encounters
        └── memory
```

### Living Regions

- persistent geography
- abstract simulation while unloaded
- Regional Shell
- Cell Streaming
- REPS propagation
- escalation stages
- World Event Queue
- route discovery/history
- hostile encounter annotations
- resume/catch-up evaluation

## Current reference region

Clifton and the approach toward the city are being used as an early regional design reference.
