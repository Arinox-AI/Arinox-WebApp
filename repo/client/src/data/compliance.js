/* Compliance & certifications, accurate designations only.
   - "Certified"  = a real, auditable certification (FCC, CE, UL, ISO 9001, ISO/IEC 27001)
   - "Compliant"  = a legal/regulatory obligation with no single issuing body (GDPR, HIPAA)
   - "Empanelled" = CERT-In empanelment for security auditing, narrower than a certification
   - OS names are a compatibility statement, not a certification, so they sit in a note.
   Note: the certifiable information-security standard is ISO/IEC 27001, not ISO 27000. */

export const hardwareCompliance = [
  { k: 'FCC',      v: 'Certified' },
  { k: 'CE',       v: 'Certified' },
  { k: 'UL',       v: 'Certified' },
  { k: 'ISO 9001', v: 'Certified' },
]

export const softwareCompliance = [
  { k: 'ISO/IEC 27001', v: 'Certified' },
  { k: 'CERT-In',       v: 'Empanelled' },
  { k: 'GDPR',          v: 'Compliant' },
  { k: 'HIPAA',         v: 'Compliant' },
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
