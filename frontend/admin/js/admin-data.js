const AGC_DATA_KEY = "agcSiteData";
const AGC_AUTH_KEY = "agcAdminAuth";

const defaultSiteData = {
  stats: {
    engagements: "120+",
    industries: "30",
    partners: "15",
  },
  social: {
    linkedin: "#",
    instagram: "#",
    facebook: "#",
  },
  blogs: [
    {
      id: crypto.randomUUID(),
      date: "2026-01-18",
      title: "How to Raise Funds for Startup in India",
      description: "A practical roadmap covering funding stages, investor fit, and key financial preparation before outreach.",
      category: "Finance",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
    },
    {
      id: crypto.randomUUID(),
      date: "2026-01-08",
      title: "How to Prepare Business for Investors India",
      description: "Build governance, reporting clarity, and a compelling growth narrative that improves investor confidence.",
      category: "Strategy",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    },
  ],
  careers: [
    {
      id: crypto.randomUUID(),
      title: "Corporate Finance Associate",
      type: "Full Time",
      mode: "Hybrid",
      description: "Work on valuations, fundraising models, and investor readiness assignments.",
      applyLink: "contact.html",
    },
  ],
  contact: {
    location: "Panchkula, India",
    email: "connect@aroraglobal.com",
    phone: "+91 00000 00000",
  },
  faqs: [
    {
      id: crypto.randomUUID(),
      question: "Do you provide business consulting services India-wide?",
      answer: "Yes, we support clients across India through hybrid and remote engagement models.",
    },
  ],
  terms:
    "By using this website, you agree to comply with applicable laws and our published terms. Website content is informational and advisory scope is defined through formal engagement contracts.",
  privacy:
    "We collect only necessary data to respond to inquiries and deliver services. We do not sell personal information and apply reasonable safeguards to protect submitted data.",
  teamMembers: [
    {
      id: crypto.randomUUID(),
      photo: "../img/AGC logo update.png",
      name: "Mr. Pradeep Arora",
      designation: "Founder and CEO",
      role:
        "Business consultant and strategic advisor focused on growth, market presence, and operational excellence.",
      expertise:
        "Transaction advisory including JVs, M&A, and funding deals up to Rs 400 crore.",
      background:
        "COO and SVP - Finance at Lumos Life Sciences; worked with Onicra/Onida Group, Windlass Group, and BDP UK.",
      qualifications: "CS, LLB, IP, and ID.",
      personal:
        "Music composition, lyrics writing, weekend cricket, and business literature.",
    },
  ],
};

const deepMerge = (base, incoming) => {
  const output = { ...base };
  Object.keys(incoming || {}).forEach((key) => {
    const baseVal = base[key];
    const nextVal = incoming[key];
    if (
      baseVal &&
      nextVal &&
      typeof baseVal === "object" &&
      typeof nextVal === "object" &&
      !Array.isArray(baseVal) &&
      !Array.isArray(nextVal)
    ) {
      output[key] = deepMerge(baseVal, nextVal);
    } else {
      output[key] = nextVal;
    }
  });
  return output;
};

const getSiteData = () => {
  const raw = localStorage.getItem(AGC_DATA_KEY);
  if (!raw) {
    return structuredClone(defaultSiteData);
  }

  try {
    const parsed = JSON.parse(raw);
    return deepMerge(structuredClone(defaultSiteData), parsed);
  } catch (_error) {
    return structuredClone(defaultSiteData);
  }
};

const saveSiteData = (data) => {
  localStorage.setItem(AGC_DATA_KEY, JSON.stringify(data));
};

const resetSiteData = () => {
  const fresh = structuredClone(defaultSiteData);
  saveSiteData(fresh);
  return fresh;
};
