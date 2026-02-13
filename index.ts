// Interfaces (Types)

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
  total: number;   // Total is just a number not an object with value property
}



// Search Function

const searchJobs = async (
  profession: string,
  city: string
): Promise<void> => {
  try {
    console.log("Searching jobs...");
    console.log(`Profession: ${profession}`);
    console.log(`City: ${city}`);
    console.log("-".repeat(50));

    const url = `https://jobsearch.api.jobtechdev.se/search?q=${profession}&municipality=${city}&offset=0&limit=10`;

    const response: Response = await fetch(url);


    // Proper HTTP error handling

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    console.log(`Total jobs found: ${data.total}`);
    console.log(`Showing ${data.hits.length} jobs`);
    console.log("=".repeat(50));


    // Use console.dir to explore nested objects

    console.dir(data, { depth: 2 });

    data.hits.forEach((job: JobAd, index: number) => {
      const pubDate: Date = new Date(job.publication_date);

      console.log(`${index + 1}. ${job.headline}`);
      console.log(`Company: ${job.employer.name}`);
      console.log(`Location: ${job.workplace_address.municipality}`);


      // Using toISOString()

      console.log(
        `Published: ${pubDate.toISOString().split("T")[0]}`
      );

      // Using toString()

      console.log(`Full Date (toString): ${pubDate.toString()}`);

      console.log("-".repeat(50));
    });
  } catch (error: unknown) {

    // Safe error handling

    if (error instanceof Error) {
      console.error("Something went wrong:", error.message);
    } else {
      console.error("An unknown error occurred.");
    }
  }
};


// Run App Function

const runApp = (): void => {
  try {
    console.log("Welcome to the Improved Job Search App");
    console.log(
      "This app searches jobs using Arbetsförmedlingen JobTech API"
    );
    console.log("=".repeat(50));

    const profession: string = "Software Developer";
    const city: string = "Malmö";

    searchJobs(profession, city);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Application error:", error.message);
    } else {
      console.error("Unknown application error.");
    }
  }
};

runApp();
