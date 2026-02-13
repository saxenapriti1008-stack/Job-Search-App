interface Employer {
  name: string;
}

interface WorkplaceAddress {
  municipality: string;
}

interface JobAd {
  headline: string;
  publication_date: string;
  employer: Employer;
  workplace_address: WorkplaceAddress;
}

interface ApiResponse {
  hits: JobAd[];
}
