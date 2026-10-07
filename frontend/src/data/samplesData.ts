export interface SampleItem {
  id: string;
  agentId: 'content' | 'copywriting' | 'video';
  agentName: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  inputBrief: Record<string, string>;
  output: any;
  rawMarkdown: string;
}

export const SAMPLES_DATA: SampleItem[] = [
  // =========================================================================
  // CONTENT WRITING SAMPLES (3)
  // =========================================================================
  {
    id: 'sample-content-1',
    agentId: 'content',
    agentName: 'Content Writing Agent',
    category: 'SEO Blog',
    title: 'The Enterprise Guide to Autonomous AI Agents in DevOps',
    description: 'Comprehensive, search-optimized technical blog analyzing multi-agent CI/CD orchestration and automated incident triaging.',
    tags: ['DevOps', 'AI Agents', 'CI/CD', 'SEO Optimized'],
    inputBrief: {
      'Content Type': 'Blog',
      'Topic': 'Autonomous AI Agents in Modern DevOps Pipelines',
      'Target Audience': 'DevOps Engineers, Site Reliability Engineers, Engineering Directors',
      'Primary Keyword': 'autonomous AI agents in DevOps',
      'Tone': 'Authoritative and Actionable',
      'Length': '~1,500 words'
    },
    output: {
      strategy: 'Targets senior DevOps practitioners seeking concrete strategies for automating incident response and code reviews without sacrificing system stability. Positions autonomous agents as collaborative copilots operating inside guarded workflows.',
      seo_information: {
        search_intent: 'Informational / Problem-Solving',
        meta_title: 'Autonomous AI Agents in DevOps: Complete 2026 Architectural Guide',
        meta_description: 'Discover how autonomous AI agents streamline CI/CD pipelines, reduce MTTR by 60%, and safeguard infrastructure through intelligent self-healing automation.',
        primary_keyword: 'autonomous AI agents in DevOps',
        secondary_keywords: ['AI CI/CD pipeline automation', 'SRE incident response AI', 'agentic DevOps orchestration']
      },
      outline: [
        'I. The Shift from Static Scripts to Autonomous DevOps Agents',
        'II. Core Architecture: How Agents Reason, Validate, and Act Safely',
        'III. Real-World Applications: Incident Triaging, Canary Analysis, and PR Reviews',
        'IV. Guardrails and Security: Preventing Autonomous Runaways in Production',
        'V. Implementation Roadmap: 4 Steps to Agentic DevOps Maturity'
      ],
      final_content: `# Autonomous AI Agents in Modern DevOps Pipelines: The 2026 Architectural Blueprint

For over a decade, DevOps automation relied on deterministic declarative pipelines: if a webhook fires, trigger a YAML job. But when complex production incidents strike across microservice clusters, static scripts fail because they cannot reason through ambiguity.

Enter **autonomous AI agents in DevOps**. Rather than executing rigid instructions, modern agentic frameworks observe telemetry, synthesize error logs, formulate hypotheses, and execute remediation within strict guardrails.

---

## 1. The Architectural Shift: From Pipelines to Reasoning Loops

Traditional automation asks: *"What command should I run?"*  
Autonomous DevOps agents ask: *"What is the anomalous state, what caused it, and what is the safest sequence of actions to restore health?"*

${'```'}
[Telemetry Ingestion] ➔ [Log & Metric Synthesis] ➔ [Hypothesis & Safety Check] ➔ [Remediation Action]
${'```'}

### Key Pillars of Agentic DevOps
1. **Context Memory**: Persistent vector indexing across Jira tickets, GitHub PRs, and Slack incident channels.
2. **Deterministic Sandboxing**: Execution happens exclusively within role-based CLI environments with blast-radius limits.
3. **Continuous Verification**: Post-action validation checks ensure regressions are caught within milliseconds.

---

## 2. Top Production Use Cases

### A. Intelligent Incident Triage & Root Cause Analysis
During high-severity alerts, human engineers waste up to 40 minutes simply gathering logs across Datadog, CloudWatch, and Kubernetes clusters. An autonomous agent can correlate anomalies across distributed traces in seconds, identifying whether a faulty database migration or an unhandled null pointer caused the cascade.

### B. Self-Healing Canary Deployments
Instead of basic percentage rollout thresholds, agents monitor real-time user latency and error logs, automatically initiating rolling rollbacks and isolating problematic pods before customers notice.

---

## 3. Production Guardrails: Zero Runaway Risk
Autonomous execution requires strict enterprise boundaries:
- **Least-Privilege API Tokens**: Read-only cluster access by default; mutation actions require programmatic approval tokens.
- **Circuit Breakers**: No agent may modify more than 5% of production traffic without senior human sign-off.
- **Full Trace Auditability**: Every prompt, tool execution, and diff is recorded to immutable compliance logs.`,
      faq: [
        {
          question: 'Do AI agents replace DevOps engineers?',
          answer: 'No. They eliminate toil by handling tier-1 alerts and diagnostics, empowering engineers to focus on architectural resilience and system design.'
        },
        {
          question: 'How do you prevent agents from making dangerous production changes?',
          answer: 'Through strict policy-as-code guardrails (such as Open Policy Agent), rate limits on mutations, and required human approvals for high-blast-radius operations.'
        }
      ],
      cta: 'Explore how CreativeForge AI streamlines technical content creation across your engineering teams. Start your enterprise trial today.',
      internal_links: [
        'Zero-Trust Security for AI Agent Deployments',
        'Benchmarking MTTR Reductions with Automated SRE Tools',
        'Step-by-Step Guide to YAML-Free Agent Pipelines'
      ]
    },
    rawMarkdown: `# Autonomous AI Agents in Modern DevOps Pipelines

## Content Strategy
Targets senior DevOps practitioners seeking concrete strategies for automating incident response...

## SEO Information
- **Search Intent**: Informational
- **Meta Title**: Autonomous AI Agents in DevOps: Complete 2026 Architectural Guide
- **Meta Description**: Discover how autonomous AI agents streamline CI/CD pipelines...

## Outline
- I. The Shift from Static Scripts to Autonomous DevOps Agents
- II. Core Architecture: How Agents Reason, Validate, and Act Safely
- III. Real-World Applications: Incident Triaging, Canary Analysis, and PR Reviews

## Final Content
... [Full Technical Content Rendered Above] ...`
  },

  {
    id: 'sample-content-2',
    agentId: 'content',
    agentName: 'Content Writing Agent',
    category: 'Website Content',
    title: 'NovaHealth Enterprise Clinic Management Homepage Copy',
    description: 'High-converting SaaS landing page content including hero banner, value props, feature grids, compliance proof, and decisive CTA sections.',
    tags: ['Website Copy', 'HealthTech', 'SaaS Landing Page', 'Conversion Focused'],
    inputBrief: {
      'Content Type': 'Website Content',
      'Topic': 'NovaHealth Clinical Intelligence & EHR Platform',
      'Target Audience': 'Medical Directors, Private Practice Owners, Healthcare Operations Executives',
      'Primary Keyword': 'AI clinic management software',
      'Tone': 'Trustworthy, Clinical, and Modern',
      'Length': 'Website-Ready Sections'
    },
    output: {
      strategy: 'Balances clinical rigor with modern operational efficiency. Targets private clinics overwhelmed by EHR administrative overhead and patient churn.',
      seo_information: {
        search_intent: 'Commercial Investigation',
        meta_title: 'NovaHealth — AI-Powered Clinic Management & EHR Automation',
        meta_description: 'Streamline patient charting, reduce physician burnout by 45%, and eliminate administrative bottlenecks with NovaHealth HIPAA-compliant clinic intelligence.',
        primary_keyword: 'AI clinic management software'
      },
      outline: [
        'Hero Section: Headline, Subheadline, Primary & Secondary CTA',
        'Social Proof & Security Bar: HIPAA, SOC2 Type II, 99.99% Uptime',
        'Core Value Pillars: Charting, Scheduling, Revenue Cycle',
        'Interactive Feature Breakdown with Metrics',
        'Practitioner Testimonial Scenario & Closing Lockup'
      ],
      final_content: `# NOVAHEALTH HOMEPAGE COPY BLUEPRINT

### SECTION 1: HERO VIEWPORT
**Eyebrow:** NEXT-GENERATION PRACTICE INTELLIGENCE  
**Headline:** Deliver Exceptional Patient Care. Leave the Administrative Burden Behind.  
**Subheadline:** NovaHealth unifies ambient AI clinical documentation, smart patient scheduling, and automated billing into one seamless, HIPAA-compliant platform. Reclaim 2.5 hours of physician charting time every day.  
**Primary CTA Button:** [Book a 15-Minute Clinical Demo]  
**Secondary Link:** [Explore Security & HIPAA Architecture]  
**Micro-Proof:** *Trusted by 850+ medical practices • Zero setup fee • Seamless EPIC & Cerner integration*

---

### SECTION 2: TRUST & COMPLIANCE BADGES
- **HIPAA Compliant** (BAA provided immediately)
- **SOC 2 Type II Certified**
- **256-Bit End-to-End Encryption**
- **99.99% Guaranteed Cloud SLA**

---

### SECTION 3: CORE VALUE PILLARS
1. **Ambient Clinical Scribing**: Captures doctor-patient dialogue naturally and formats SOAP notes in real time.
2. **Predictive Schedule Optimization**: Cuts patient no-shows by 38% using automated SMS appointment confirmations and adaptive waitlist filling.
3. **Autonomous Revenue Cycle**: Pre-scrubs insurance claims to ensure a 98.4% first-pass clean acceptance rate.

---

### SECTION 4: THE DOCTOR-FIRST PROMISE
> *"Healthcare providers should spend their days connecting with patients, not typing into clunky legacy portals until 9 PM. NovaHealth makes practice management feel invisible."*`,
      faq: [
        {
          question: 'Does NovaHealth integrate with our existing EHR?',
          answer: 'Yes. NovaHealth integrates via bidirectional FHIR/HL7 APIs with EPIC, Cerner, AthenaHealth, and NextGen.'
        },
        {
          question: 'Is patient voice data stored or used to train third-party models?',
          answer: 'No. All audio is transcribed in volatile memory and encrypted at rest with zero third-party training rights.'
        }
      ],
      cta: 'Ready to modernize your medical practice? Schedule a custom 15-minute walkthrough with our clinical specialists today.',
      internal_links: [
        'Ambient Clinical AI Documentation Demo',
        'HIPAA Compliance & Security Whitepaper',
        'ROI Calculator for Private Practices'
      ]
    },
    rawMarkdown: `# NovaHealth Clinical Intelligence Homepage Copy

### HERO SECTION
**Headline:** Deliver Exceptional Patient Care. Leave the Administrative Burden Behind.
...`
  },

  {
    id: 'sample-content-3',
    agentId: 'content',
    agentName: 'Content Writing Agent',
    category: 'E-Book Content',
    title: 'The Modern Founder\'s Handbook: Scaling from $1M to $10M ARR',
    description: 'Deep-dive chapter content with frameworks, tactical playbooks, financial levers, and organizational designs for B2B founders.',
    tags: ['E-Book', 'SaaS Scaling', 'Executive Leadership', 'Thought Leadership'],
    inputBrief: {
      'Content Type': 'E-Book',
      'Topic': 'Overcoming the $1M to $10M ARR SaaS Plateau',
      'Target Audience': 'B2B SaaS Founders, Seed/Series A CEOs, Venture Partners',
      'Primary Keyword': 'scaling SaaS to 10M ARR',
      'Tone': 'Pragmatic, Direct, and Experienced',
      'Length': 'Chapter-Based Deep Dive (~2,000 words)'
    },
    output: {
      strategy: 'Addresses the brutal transition from founder-led sales to repeatable go-to-market motions. Focuses on the math, hiring discipline, and product telemetry required to cross $10M ARR.',
      seo_information: {
        search_intent: 'Commercial / Educational Lead Magnet',
        meta_title: 'Scaling from $1M to $10M ARR: The SaaS Founder Playbook',
        meta_description: 'Download Chapter 3 of the Founder Handbook: Moving beyond founder-led sales, unit economics, and building an unstoppable GTM engine.',
        primary_keyword: 'scaling SaaS to 10M ARR'
      },
      outline: [
        'Chapter 3: The Danger Zone Between $1M and $3M ARR',
        'The Fallacy of the Early Generalist: When to Specialize GTM',
        'The Three SaaS Unit Economic Levers That Actually Matter',
        'Building Your First Repeatable Sales Pod',
        'Summary Checklist: The 10M Readiness Audit'
      ],
      final_content: `# CHAPTER 3: CROSSING THE CHASM FROM $1M TO $10M ARR

Crossing $1M in Annual Recurring Revenue is a testament to raw hustle, product insight, and founder will. But the playbook that got you to $1M will actively break your company if you try to use it to reach $10M.

At $1M, you are winning deals because **you** are on the calls. Customers are buying your vision, your agility, and your willingness to build custom features on a weekend.

At $10M, customers aren't buying you. They are buying an institutional solution with predictable SLA, dependable onboarding, and clear ROI.

---

## The Three Unit Economic Levers That Actually Matter

When scaling toward $10M ARR, stop obsessing over vanity metrics and track these three health indicators relentlessly:

1. **Net Revenue Retention (NRR) > 115%**: If your leaky bucket exceeds 1.5% monthly churn, no amount of inbound top-of-funnel marketing will save you.
2. **Magic Number > 0.85**: Net New ARR divided by quarterly Sales & Marketing spend. If this dips below 0.7, your acquisition engine is inefficient.
3. **CAC Payback Period < 14 Months**: Cash is oxygen; extended payback cycles drain your runway before compounding takes over.

---

## Transitioning Out of Founder-Led Sales

The most common trap is hiring a VP of Sales too early. A VP of Sales manages scale; they do not invent a repeatable motion.

Instead, hire **two mid-market Account Executives simultaneously**:
- Running two reps eliminates the ambiguity of individual talent variance.
- If Rep A closes 6 deals and Rep B closes zero, you have a coaching issue.
- If both struggle, your ICP definition or sales enablement materials are broken.

---

## Key Chapter Takeaways
- Institutionalize tribal knowledge into playbooks before doubling headcount.
- Customer success is not a post-sale cost center; it is your primary expansion revenue engine.
- Protect gross margins ruthlessly as server and AI inference costs scale.`,
      faq: [
        {
          question: 'What is the ideal team composition when crossing $3M ARR?',
          answer: 'Typically 1 VP of Sales, 4 quota-carrying AEs, 2 SDRs, 2 Customer Success Managers, and a dedicated Solutions Architect for enterprise deals.'
        }
      ],
      cta: 'Download the full 60-page PDF edition of The Modern Founder\'s Handbook complete with financial modeling spreadsheets.',
      internal_links: [
        'B2B SaaS Financial Modeling Template',
        'The Net Revenue Retention Playbook',
        'Hiring Your First VP of Engineering Guide'
      ]
    },
    rawMarkdown: `# The Modern Founder's Handbook: Scaling from $1M to $10M ARR

### Chapter 3: Crossing the Chasm
...`
  },

  // =========================================================================
  // COPYWRITING & ADS SAMPLES (3)
  // =========================================================================
  {
    id: 'sample-copywriting-1',
    agentId: 'copywriting',
    agentName: 'Copywriting & Ads Agent',
    category: 'Facebook/Instagram Ad',
    title: 'Lumina Sleep: High-Impact Meta Feed & Story Campaign',
    description: 'Direct-response Facebook and Instagram ad campaign featuring 3 psychological angles, hooks, headlines, and conversion tracking matrix.',
    tags: ['Facebook Ads', 'Instagram Reels', 'Direct Response', 'E-Commerce'],
    inputBrief: {
      'Platform': 'Facebook & Instagram',
      'Copy Type': 'Feed Carousel & Video Hook',
      'Product/Service': 'Lumina Circadian Light Glasses',
      'Target Audience': 'High-performance executives, software engineers, and shift workers struggling with sleep quality',
      'Campaign Goal': 'Direct Product Purchases ($189 AOV)',
      'Pain Point': 'Waking up exhausted after 8 hours in bed due to blue light circadian disruption',
      'Key Benefit': '98% blue-light filtering lenses clinically proven to boost REM and deep sleep by 42% in 7 nights',
      'Offer': '30-Night Risk-Free Sleep Trial + 20% Launch Discount'
    },
    output: {
      campaign_strategy: 'Targets high-intent health optimizers who track their sleep via Oura/Whoop. Emphasizes clinical mechanism (circadian melatonin reset) over aesthetic fashion.',
      creative_angle: 'Sleep Debt vs Real Deep Sleep: Why sleeping 8 hours feels like 4 hours.',
      variations: [
        {
          id: 'v1',
          name: 'Variation 1: Pain-Agitate-Solve (The Exhaustion Paradox)',
          target_angle: 'Addresses morning grogginess despite sleeping full nights',
          hook: 'You slept for 8 hours. Why do you still feel like you were hit by a freight train?',
          body: 'Here is what nobody tells you about your evening screen time:\n\nIt is not about eye fatigue. It is about melatonin suppression. Blue light past 8 PM tricks your brain into thinking it is 12 noon, obliterating your deep sleep stages.\n\nLumina Circadian Glasses filter out 98% of peak disruptive spectrum wavelengths. Slip them on 90 minutes before bed:\n• Fall asleep in under 15 minutes\n• Increase deep sleep cycles by 42%\n• Wake up energized without 3 cups of coffee',
          headline: 'Fix Your Deep Sleep in 7 Nights (Or It Is Free)',
          cta: 'Claim 20% Off + 30-Day Trial'
        },
        {
          id: 'v2',
          name: 'Variation 2: Direct Value & Wearable Proof',
          target_angle: 'Leverages quantifiable biometric data and biohacking appeal',
          hook: 'Check your Oura or Whoop recovery score. Notice anything alarming lately?',
          body: 'If your HRV is low and your deep sleep is under 1 hour, your evening lighting is destroying your recovery.\n\nLumina blocks the precise 450-480nm wavelengths that suppress natural melatonin release.\n\nOver 14,000 athletes and founders use Lumina every evening. Put them on, shut out artificial spectrum glare, and wake up with a green recovery score tomorrow.',
          headline: 'Clinically Engineered Circadian Sleep Glasses',
          cta: 'Shop the 30-Night Trial'
        },
        {
          id: 'v3',
          name: 'Variation 3: Pattern Interrupt (The Coffee Trap)',
          target_angle: 'Challenges coffee and energy drink dependency',
          hook: 'Stop buying expensive sleep supplements until you fix this one evening habit.',
          body: 'Melatonin gummies leave you groggy. White noise machines don\'t stop blue photons from hitting your retinas.\n\nYour eyes contain melanopsin receptors that dictate your body clock. One hour of laptop glare resets that clock by 3 hours.\n\nLumina protects your biological night mode with medical-grade precision lenses. Experience the difference tonight.',
          headline: 'Sleep Deeper Tonight with Lumina Optics',
          cta: 'Get Your Pair Today'
        }
      ],
      headlines: [
        'Fix Your Deep Sleep in 7 Nights (Or It Is Free)',
        'Why Sleeping 8 Hours Still Leaves You Exhausted',
        'The Circadian Glasses Engineered for Peak Deep Sleep',
        'Wake Up Recharged: 30-Night Risk-Free Sleep Guarantee'
      ],
      ctas: [
        'Claim 20% Off + 30-Day Trial',
        'Shop the 30-Night Sleep Trial',
        'Experience Real Deep Sleep',
        'Order Risk-Free Today'
      ],
      ab_tests: [
        {
          hypothesis: 'Testing wearable sleep tracker angle against morning exhaustion hook will isolate whether biohackers or general mass consumers drive lower CAC.',
          variant_a: 'Wearable Data Angle (Oura/Whoop Recovery Hook)',
          variant_b: 'Exhaustion Paradox Angle ("Slept 8 hours, still tired?")',
          metric_to_track: 'CTR (Click-Through Rate) and Cost Per Purchase (CPA)'
        },
        {
          hypothesis: 'Direct discount offer CTA vs Risk-free trial CTA.',
          variant_a: '"Claim 20% Off + Free Shipping"',
          variant_b: '"Try Risk-Free for 30 Nights"',
          metric_to_track: 'Add-to-Cart Conversion Rate (CVR)'
        }
      ]
    },
    rawMarkdown: `# Lumina Sleep Meta Ads Campaign
...`
  },

  {
    id: 'sample-copywriting-2',
    agentId: 'copywriting',
    agentName: 'Copywriting & Ads Agent',
    category: 'Google Ad',
    title: 'CloudGuard: High-Intent Google Search Ad Group',
    description: 'High-intent search campaign with optimized character limits, responsive headline variations, asset descriptions, and sitelink extensions.',
    tags: ['Google Search', 'PPC', 'Cybersecurity', 'High Intent'],
    inputBrief: {
      'Platform': 'Google Ads (Search Network)',
      'Copy Type': 'Responsive Search Ads (RSA)',
      'Product/Service': 'CloudGuard Automated SOC2 & ISO 27001 Compliance Platform',
      'Target Audience': 'CTOs, Heads of Compliance, IT Directors seeking enterprise certifications fast',
      'Campaign Goal': 'Demo Requests & Sales Qualified Leads (SQL)',
      'Pain Point': 'Spending 6+ months collecting hundreds of audit evidence screenshots manually',
      'Key Benefit': 'Continuous automated compliance tracking across AWS, GCP, and GitHub in under 14 days',
      'Offer': 'Free Audit Readiness Scorecard'
    },
    output: {
      campaign_strategy: 'Targeting exact-match high-intent commercial keywords ("SOC2 compliance automation", "fastest way to get SOC2"). Positions CloudGuard as the auditor-vetted solution with zero manual screenshot hassle.',
      creative_angle: 'Speed & Audit Certainty: Get SOC2 certified in 14 days without hiring expensive consultants.',
      variations: [
        {
          id: 'rsa_1',
          name: 'Responsive Search Ad Formulation 1: Speed & Automation',
          target_angle: 'Focused on rapid turnaround for deals blocked by security audits',
          hook: 'Blocked by enterprise security reviews? Get SOC 2 certified in days.',
          body: 'Automate 90% of evidence collection across AWS, GitHub, and Okta. CloudGuard connects seamlessly in minutes, continuously monitors 100+ controls, and pairs you with top-tier accredited auditors.',
          headline: 'SOC 2 Certified in 14 Days | Continuous Audit Automation',
          cta: 'Get Free Readiness Audit'
        },
        {
          id: 'rsa_2',
          name: 'Responsive Search Ad Formulation 2: Cost & Labor Savings',
          target_angle: 'Focused on cutting out expensive external consultants and manual hours',
          hook: 'Stop spending $50k on compliance consultants and manual spreadsheets.',
          body: 'Eliminate manual screenshot collection. Over 1,200 fast-growing startups use CloudGuard to achieve SOC 2 Type I and II, ISO 27001, and HIPAA compliance without the headaches.',
          headline: 'Automated SOC 2 Compliance | Save $30,000 on Audits',
          cta: 'Book a 15-Min Live Demo'
        }
      ],
      headlines: [
        'SOC 2 Certified in 14 Days (30 char limit compliant)',
        'Automated SOC 2 & ISO 27001',
        'Pass Your Security Audit Fast',
        'Zero Manual Screenshots Needed',
        'Continuous Cloud Compliance AI'
      ],
      ctas: [
        'Get Free Readiness Audit',
        'Book 15-Min Live Demo',
        'See Audit Pricing Instantly',
        'Start Automated Compliance'
      ],
      ab_tests: [
        {
          hypothesis: 'Testing turnaround speed ("14 Days") vs cost savings ("Save $30k") in the primary headline.',
          variant_a: 'Headline: "SOC 2 Certified in 14 Days"',
          variant_b: 'Headline: "Cut Compliance Costs by 70%"',
          metric_to_track: 'Search Impression Share CTR & Qualified Lead Form Submissions'
        }
      ]
    },
    rawMarkdown: `# CloudGuard Google Search Ad Blueprint
...`
  },

  {
    id: 'sample-copywriting-3',
    agentId: 'copywriting',
    agentName: 'Copywriting & Ads Agent',
    category: 'Email Campaign',
    title: 'ChurnShield: B2B SaaS Win-Back & Retention Sequence',
    description: 'Conversion-driven email nurture sequence with curiosity subject lines, preview text, psychological body copy, and single-focus CTA.',
    tags: ['Email Marketing', 'B2B Nurture', 'Customer Retention', 'Cold Outreach'],
    inputBrief: {
      'Platform': 'Email',
      'Copy Type': '3-Part Retention Nurture Sequence',
      'Product/Service': 'ChurnShield — Predictive Customer Health & Downgrade Prevention',
      'Target Audience': 'Heads of Customer Success and Chief Revenue Officers at B2B subscription businesses',
      'Campaign Goal': 'Schedule 20-minute product pilot reviews',
      'Pain Point': 'Accounts quietly churning at renewal without warning or early signals',
      'Key Benefit': 'Machine learning identifies account disengagement 60 days before contract expiry',
      'Offer': 'Complimentary 30-Day Historical Data Churn Analysis'
    },
    output: {
      campaign_strategy: 'Direct B2B value-focused email sequence. Avoids robotic marketing buzzwords and speaks as a peer CS strategist identifying blind spots.',
      creative_angle: 'The Silent Churn Trap: Why product usage metrics lie until it is too late.',
      variations: [
        {
          id: 'email_1',
          name: 'Email 1: The Blind Spot (Subject Line + Body)',
          target_angle: 'Uncovering false security in active user logins',
          hook: 'Subject: Your healthiest-looking account might cancel next month',
          body: 'Hi {{First_Name}},\n\nMost Customer Success teams track green checkmarks based on a single metric: "Did they log in this week?"\n\nHere is the painful reality: when an enterprise champion prepares to cancel, their team actually logs in MORE frequently. They are exporting CSV reports, pulling contacts, and compiling migration lists.\n\nBy the time your rep gets the cancellation notification, the decision was made 45 days ago.\n\nChurnShield tracks 14 predictive health indicators—including feature velocity, executive sponsor seat activity, and API latency—to flag churn risk 60 days before renewal.\n\nWe would love to run a zero-integration historical churn analysis on your last 3 churned accounts to show you where the warning signs were.\n\nDo you have 10 minutes this Thursday afternoon?',
          headline: 'Subject Line: Your healthiest-looking account might cancel next month',
          cta: 'Book 10-Minute Pilot Call'
        },
        {
          id: 'email_2',
          name: 'Email 2: The Math of 5% Churn Reduction',
          target_angle: 'Financial framing for CRO and VP Revenue',
          hook: 'Subject: The ARR impact of 5% less churn on your 2026 valuation',
          body: 'Hi {{First_Name}},\n\nReducing annual revenue churn from 12% to 7% creates more enterprise valuation than hiring 3 additional quota-carrying sales reps.\n\nWhen accounts expand predictably, your customer acquisition cost (CAC) gets amortized over years instead of months.\n\nChurnShield automates automated playbooks the second an account shows early friction:\n1. Automatic Slack alerts to the assigned CSM\n2. Triggered executive check-in prompts\n3. Pre-emptive feature adoption guides\n\nLet\'s take a look at your renewal pipeline for next quarter. Grab a slot on my calendar below.',
          headline: 'Subject Line: The ARR impact of 5% less churn',
          cta: 'Pick a Time on My Calendar'
        }
      ],
      headlines: [
        'Subject Line: Your healthiest-looking account might cancel next month',
        'Subject Line: 60 days before they cancel (the signs you\'re missing)',
        'Subject Line: The ARR impact of 5% less churn in 2026',
        'Preview Text: Why login frequency is the most misleading CS metric.'
      ],
      ctas: [
        'Book 10-Minute Pilot Call',
        'Schedule Free Churn Diagnostic',
        'Explore Interactive Demo',
        'Review Your Renewal Pipeline'
      ],
      ab_tests: [
        {
          hypothesis: 'Curiosity problem subject line vs direct revenue ROI subject line.',
          variant_a: '"Your healthiest-looking account might cancel next month"',
          variant_b: '"How 5% churn reduction changes your 2026 valuation"',
          metric_to_track: 'Unique Open Rate (UOR) and Reply Rate'
        }
      ]
    },
    rawMarkdown: `# ChurnShield B2B Email Nurture Sequence
...`
  },

  // =========================================================================
  // VIDEO PRODUCTION SAMPLES (3)
  // =========================================================================
  {
    id: 'sample-video-1',
    agentId: 'video',
    agentName: 'Video Production Agent',
    category: 'Video Script',
    title: 'SynthAudio AI: 60-Second Cinematic Explainer Script',
    description: 'Complete commercial production script with timestamps, character dialog, voice modulation, and visual staging cues.',
    tags: ['Commercial Script', 'Explainer', 'Audio Tech', 'YouTube Video'],
    inputBrief: {
      'Video Type': 'Product Explainer & Brand Film',
      'Topic': 'Instant Studio-Quality Voice Cloning for Podcasters & Filmmakers',
      'Platform': 'YouTube & Website Hero',
      'Target Duration': '60 seconds',
      'Target Audience': 'Content creators, indie filmmakers, audio engineers',
      'Goal': 'Demonstrate audio realism and trigger free trial signups',
      'Tone': 'Cinematic, Intriguing, and Crisp',
      'Product/Service': 'SynthAudio Studio',
      'CTA': 'Clone your first voice free at synthaudio.io'
    },
    output: {
      creative_concept: 'The Magic of Invisible Sound. Contrasts muffled, echoey amateur bedroom recording with a sudden transition to pristine Abbey Road acoustic perfection.',
      hook: 'Close-up of a cheap broken microphone falling in extreme slow motion. Sound suddenly cuts to total vacuum silence.',
      full_script: `[0:00 - 0:05] PROLOGUE: THE NOISE
(Visual: Dimly lit bedroom. A creator winces while listening to a buzzing, echoey audio track with heavy background air-conditioner hum.)
CREATOR (Weary): "I spent six hours recording... and it sounds like I'm inside an empty tin can."

[0:06 - 0:15] THE TRANSFORMATION
(Visual: Creator drags the distorted WAV file into the glowing dark-mode interface of SynthAudio Studio. He clicks 'Studio Master'.)
SFX: Deep cinematic sub-bass whoosh.
NARRATOR (VO - Warm, rich, velvety broadcast tone):
"Great storytelling should never be killed by bad acoustics."

[0:16 - 0:32] THE CAPABILITY SHOWCASE
(Visual: Kinetic typography dances across the screen. Real-time neural waveforms render with zero latency.)
NARRATOR (VO):
"Meet SynthAudio Studio. One single microphone click strips room reflection, isolates harmonic warmth, and clones your natural vocal signature across 40 global languages."

[0:33 - 0:48] THE MULTI-VOICE DEMO
(Visual: Rapid-fire split screen showing different video genres: a nature documentary, a fast tech reel, a warm meditation podcast.)
NARRATOR (VO):
"Flawless inflection. Human cadence. Zero robotic artifacting. Whether you're dubbing a global film or perfecting your weekly show."

[0:49 - 1:00] THE RESOLVE & OUTRO
(Visual: The creator leans back in his chair with a confident smile. Clean, polished hero title card fades in with soft neon blue backlight.)
NARRATOR (VO):
"Stop re-recording. Start publishing. Try SynthAudio Studio free today."
ON-SCREEN TEXT: Clone Your First Voice Free • synthaudio.io`,
      storyboard: [
        {
          scene_number: 1,
          duration: '0:00 - 0:06 (6s)',
          visual: 'Frustrated creator at desk rubbing temples, messy room reflection on monitor.',
          action: 'Stops playback in frustration and tosses headphones onto desk.',
          camera_shot: 'Macro 35mm lens, handheld slight drift.',
          voice_over: 'I spent six hours recording... and it sounds like a tin can.',
          on_screen_text: 'The Bedroom Studio Struggle',
          audio_sfx: 'Exaggerated audio hum, fan whir, and sharp headphone clatter.'
        },
        {
          scene_number: 2,
          duration: '0:06 - 0:18 (12s)',
          visual: 'SynthAudio UI glowing in deep violet. Waveform smooths into golden threads.',
          action: 'Click action ripples outward into glowing acoustic pulse.',
          camera_shot: 'Smooth dolly push-in on ultra-wide monitor.',
          voice_over: 'Great storytelling should never be killed by bad acoustics.',
          on_screen_text: 'One Click. Pure Acoustic Isolation.',
          audio_sfx: 'Sub-bass drop into crisp, vacuum silence followed by lush acoustic reverb.'
        }
      ],
      shot_list: [
        'Shot 1: Extreme Close-Up (ECU) of creator eyes reflecting timeline audio glitches',
        'Shot 2: Medium Shot (MS) of desktop workspace with warm practical desk lamp',
        'Shot 3: Screen capture macro shot of neural waveform synthesis',
        'Shot 4: Wide tracking shot of creator listening in pristine acoustic bliss',
        'Shot 5: Branded 3D logo resolve with glassmorphism glow'
      ],
      voice_over: 'Voice Actor Direction: Warm, authoritative, broadcast quality. Pacing: measured and confident, never rushed.',
      on_screen_text: [
        'The Bedroom Studio Struggle',
        'Instant Acoustic Isolation',
        '40+ Languages • Zero Artifacts',
        'Clone Your First Voice Free • synthaudio.io'
      ],
      audio_sfx: 'Sub-bass sweep, cinematic vacuum silence, crisp clicks, elegant ambient orchestral synth outro.',
      social_media_version: '15-second cut: [0:00] Creator says "Before AI" (ugly buzz audio). [0:03] Snaps fingers (pristine broadcast voice). [0:08] "Fix any audio file in 3 seconds at synthaudio.io".',
      cta: 'Visit synthaudio.io to master your audio and clone your first voice free.'
    },
    rawMarkdown: `# SynthAudio 60-Second Explainer Script
...`
  },

  {
    id: 'sample-video-2',
    agentId: 'video',
    agentName: 'Video Production Agent',
    category: 'Storyboard',
    title: 'Solaris EV: 30-Second Commercial Storyboard',
    description: 'Full 4-scene commercial storyboard detailing visual frames, camera lenses, subject movement, sound design, and text typography.',
    tags: ['Storyboard', 'Commercial', 'Automotive / EV', 'Cinematic'],
    inputBrief: {
      'Video Type': 'Cinematic Commercial',
      'Topic': 'Zero-Emission Ultra-Fast Charging Electric SUV Launch',
      'Platform': 'National Broadcast & YouTube 4K',
      'Target Duration': '30 seconds',
      'Target Audience': 'Luxury vehicle buyers, eco-conscious professionals, tech adopters',
      'Goal': 'Position Solaris EV as the future of effortless high-performance travel',
      'Tone': 'Epic, Minimalist, and Breath-taking',
      'Product/Service': 'Solaris Apex Electric SUV',
      'CTA': 'Reserve your priority delivery at solarismotors.com'
    },
    output: {
      creative_concept: 'The Light Ahead. Highlighting speed and clean silence. The vehicle slices through early dawn mist, illuminating a winding coastal highway with aerodynamic grace.',
      hook: 'Dark screen with only the laser-thin LED headlight bar igniting with a sharp electric hum.',
      full_script: `[0:00 - 0:05]
VO: "Silence isn't the absence of power."
(Visual: LED light bar ignites. Front wheel turns in slow motion on dewy asphalt.)

[0:05 - 0:14]
VO: "It's power... refined."
(Visual: Vehicle surges forward through redwood coastal curves. Drone view captures breathtaking panoramic turn.)

[0:14 - 0:22]
VO: "500 miles of range. 10 minutes to charge. Zero compromises."
(Visual: Interior cabin shot showing panoramic HUD and driver hands effortlessly resting on steering wheel.)

[0:22 - 0:30]
VO: "The road didn't change. You did. The Solaris Apex."
(Visual: Vehicle reaches cliffside overlook at golden hour sunrise. Clean logo resolve.)`,
      storyboard: [
        {
          scene_number: 1,
          duration: '0:00 - 0:05 (5s)',
          visual: 'Pitch black setting. Ultra-slim geometric headlights slice through morning mountain mist.',
          action: 'Headlight cluster sequential startup animation pulses with bright ice-blue beam.',
          camera_shot: 'Low-angle extreme wide, locked on chassis center.',
          voice_over: 'Silence isn\'t the absence of power.',
          on_screen_text: 'THE NEW STANDARD',
          audio_sfx: 'Subtle high-frequency electric coil whine escalating into low resonant hum.'
        },
        {
          scene_number: 2,
          duration: '0:05 - 0:14 (9s)',
          visual: 'Sweeping drone aerial overlooking California Highway 1 as Solaris carves through coastal hairpin.',
          action: 'Vehicle accelerates with zero body roll; water droplets spray off aerodynamic rear spoiler.',
          camera_shot: 'FPV drone swooping from 200 feet down to 6 feet tracking passenger side.',
          voice_over: 'It\'s power... completely refined.',
          on_screen_text: '0–60 IN 2.8 SECONDS',
          audio_sfx: 'Distant sonic whoosh, tire grip on asphalt, ethereal synthesizer melody.'
        },
        {
          scene_number: 3,
          duration: '0:14 - 0:22 (8s)',
          visual: 'Interior cockpit illuminated by ambient dusk lights. Minimalist OLED dash displays charging status.',
          action: 'Driver taps hyper-responsive touchscreen; heads-up display maps scenic route.',
          camera_shot: 'Close-up 50mm shallow depth of field, gentle tracking from steering column.',
          voice_over: '500 miles of range. 10 minutes to charge.',
          on_screen_text: '500 MILE RANGE • 350kW CHARGING',
          audio_sfx: 'Soft haptic chime, futuristic UI interaction clicks, clean cabin acoustic isolation.'
        },
        {
          scene_number: 4,
          duration: '0:22 - 0:30 (8s)',
          visual: 'Vehicle comes to a smooth halt at Pacific overlook. Sunrise crests over ocean horizons.',
          action: 'Sun reflects across sculpted titanium bodywork. Logo animates into position.',
          camera_shot: 'Golden hour three-quarter hero beauty shot, slow crane elevation.',
          voice_over: 'The road didn\'t change. You did. Solaris Apex.',
          on_screen_text: 'SOLARIS APEX • RESERVE YOURS AT SOLARISMOTORS.COM',
          audio_sfx: 'Final musical chord resolves with warm cinematic piano note.'
        }
      ],
      shot_list: [
        'Shot 1: Extreme Low Angle of front grille and laser light sweep',
        'Shot 2: High-speed FPV drone dive tracking vehicle along ocean cliffs',
        'Shot 3: Macro shot of aerodynamic carbon fiber wheel vortex',
        'Shot 4: Interior over-the-shoulder (OTS) shot of futuristic driver cockpit',
        'Shot 5: Golden hour crane pull-away reveal against endless ocean'
      ],
      voice_over: 'Delivery: Understated, masculine, poetic, and confident. Deep timbre.',
      on_screen_text: [
        'THE NEW STANDARD',
        '0–60 IN 2.8s',
        '500 MILES RANGE',
        'SOLARIS APEX'
      ],
      audio_sfx: 'Pulsing electric motor crescendo, wind whoosh, warm grand piano chords, pristine silence.',
      social_media_version: '9:16 Vertical Cut: Rapid 3-second cuts synched to trending bass drops showing speed, interior, and charging speed.',
      cta: 'Explore the future of mobility at solarismotors.com'
    },
    rawMarkdown: `# Solaris EV Storyboard Blueprint
...`
  },

  {
    id: 'sample-video-3',
    agentId: 'video',
    agentName: 'Video Production Agent',
    category: 'Social Media Video',
    title: 'ByteChef: 15-Second Viral TikTok / Reels Growth Asset',
    description: 'High-velocity 9:16 vertical video blueprint engineered with visual pattern interrupts, fast text callouts, and TikTok trending audio cues.',
    tags: ['TikTok', 'Instagram Reels', 'Vertical 9:16', 'Viral Growth'],
    inputBrief: {
      'Video Type': 'Viral Social Media Short (9:16)',
      'Topic': 'AI Fridge Scanner that Generates Michelin-Star Recipes from Leftovers',
      'Platform': 'TikTok & Instagram Reels (9:16 Vertical)',
      'Target Duration': '15 seconds',
      'Target Audience': 'Gen Z and Millennial home cooks, busy urban professionals',
      'Goal': 'App downloads on iOS & Android',
      'Tone': 'High-Paced, Relatable, and Surprising',
      'Product/Service': 'ByteChef AI Meal Planner',
      'CTA': 'Download ByteChef free in bio'
    },
    output: {
      creative_concept: 'The Depressing Fridge Transformation. Open an almost empty fridge with half a tomato and some cheese, and 5 seconds later have a restaurant-grade gourmet dish.',
      hook: 'Subject opens fridge door directly into the camera lens with a stunned "I have literally nothing to eat" face.',
      full_script: `[0:00 - 0:03] THE HOOK
CREATOR (Fast, exasperated): "Tell me why I have 4 random ingredients and negative willpower to cook?"
(Visual: Phone scans a half-cut onion, an egg, and a slice of cheddar.)

[0:04 - 0:08] THE SCAN
(Visual: ByteChef green laser scanning UI overlays on camera. BEEP! 3 gourmet recipes generate instantly.)
VO: "Stop ordering $35 takeout. Scan your fridge with ByteChef."

[0:09 - 0:12] THE SIZZLE
(Visual: Rapid 0.5s whip pans of pan sizzling, egg folding into a luscious golden French omelette topped with melted cheddar.)
CREATOR: "Bro... this took 4 minutes."

[0:13 - 0:15] OUTRO
(Visual: Creator takes a huge bite with chef kiss. Big green download button overlay.)
VO: "Download ByteChef free in bio!"`,
      storyboard: [
        {
          scene_number: 1,
          duration: '0:00 - 0:03 (3s)',
          visual: 'POV camera inside the fridge looking out at creator opening the door with disappointed expression.',
          action: 'Creator sighs, points camera inside messy fridge.',
          camera_shot: 'Vertical 9:16 Ultra-wide lens inside fridge shelf.',
          voice_over: 'Tell me why I have 4 random ingredients and zero willpower?',
          on_screen_text: 'ME AT 8:45 PM EVERY NIGHT 😭',
          audio_sfx: 'Suction pop of fridge door opening followed by comical record scratch.'
        },
        {
          scene_number: 2,
          duration: '0:03 - 0:08 (5s)',
          visual: 'ByteChef app scanning HUD detects items: "1 Egg, 1/2 Red Onion, Aged Cheddar".',
          action: 'App generates "Gourmet French Onion Omelette - 6 min".',
          camera_shot: 'Over-the-shoulder vertical screen recording.',
          voice_over: 'Stop spending $40 on DoorDash. Just scan with ByteChef.',
          on_screen_text: 'SCANNING INGREDIENTS... ✨',
          audio_sfx: 'High-tech scanner beep and success chime.'
        },
        {
          scene_number: 3,
          duration: '0:08 - 0:12 (4s)',
          visual: 'Fast montage: diced onions sizzling in pan, egg whisking, golden plate reveal.',
          action: 'Creator plates dish like a Michelin star chef.',
          camera_shot: 'Macro top-down kitchen counter shots, fast whip pans.',
          voice_over: 'This literally took 4 minutes and cost $1.50.',
          on_screen_text: 'TOTAL TIME: 4 MINUTES 🔥',
          audio_sfx: 'Sizzling pan SFX, upbeat trending bass beat.'
        },
        {
          scene_number: 4,
          duration: '0:12 - 0:15 (3s)',
          visual: 'Creator takes bite, gives huge thumbs up. End-card app icon pulses.',
          action: 'Points down to link in bio.',
          camera_shot: 'Eye-level smiling selfie video.',
          voice_over: 'Download ByteChef free in bio right now!',
          on_screen_text: 'FREE ON APP STORE 📲 LINK IN BIO',
          audio_sfx: 'Satisfying crunch followed by energetic notification pop.'
        }
      ],
      shot_list: [
        'Shot 1: Inside-fridge POV looking out at user face',
        'Shot 2: App UI AR bounding boxes over ingredients',
        'Shot 3: Macro pan sizzle with steam rising',
        'Shot 4: Reaction face taking first bite with big smile'
      ],
      voice_over: 'Fast-paced, energetic Gen Z voice, casual and conversational.',
      on_screen_text: [
        'ME AT 8:45 PM 😭',
        'SCANNING INGREDIENTS... ✨',
        'TOTAL TIME: 4 MINS 🔥',
        'FREE LINK IN BIO 📲'
      ],
      audio_sfx: 'Fridge suction, record scratch, AR scanner beeps, pan sizzle, upbeat trending phonk beat.',
      social_media_version: 'Complete 15-second vertical edit optimized for viral TikTok engagement algorithms.',
      cta: 'Download ByteChef free via the link in bio today!'
    },
    rawMarkdown: `# ByteChef Viral TikTok Short
...`
  }
];
