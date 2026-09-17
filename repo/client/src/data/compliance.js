/* Compliance & certifications, accurate designations only.
   - "Certified"  = a real, auditable certification (FCC, CE, UL, ISO 9000, ISO 27000)
   - "Compliant"  = a legal/regulatory obligation with no single issuing body (GDPR, HIPAA)
   - "Empanelled" = CERT-In empanelment for security auditing, narrower than a certification
   - OS names are a compatibility statement, not a certification, so they sit in a note. */

export const hardwareCompliance = [
  { k: 'FCC',      v: 'Certified' },
  { k: 'CE',       v: 'Certified' },
  { k: 'UL',       v: 'Certified' },
  { k: 'ISO 9000', v: 'Certified' },
]

export const softwareCompliance = [
  { k: 'ISO 27000', v: 'Certified' },
  { k: 'CERT-In',   v: 'Empanelled' },
  { k: 'GDPR',      v: 'Compliant' },
  { k: 'HIPAA',     v: 'Compliant' },
]

export const complianceGroups = [
  {
    key: 'hardware',
    label: 'CommandCore',
    items: hardwareCompliance,
    note: 'Compatible with Windows and Linux',
  },
  {
    key: 'software',
    label: 'Platform',
    items: softwareCompliance,
  },
]
