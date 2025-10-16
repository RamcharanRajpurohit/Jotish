import { Employee } from '../types/employee';

/**
 * Fetches and parses employee data from the API proxy.
 * @returns A promise that resolves to an array of Employee objects.
 */
export const fetchEmployees = async (): Promise<Employee[]> => {
  // The proxy API call doesn't actually need username/password for this demo,
  // but in a real app you would pass credentials here.
  const response = await fetch("/api/proxy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Dummy credentials as per original code
      username: "test",
      password: "123456",
    }),
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();

  if (data.TABLE_DATA && data.TABLE_DATA.data) {
    const parsedEmployees: Employee[] = data.TABLE_DATA.data.map((row: string[]) => ({
      name: row[0],
      position: row[1],
      office: row[2],
      extnumber: row[3],
      startdate: row[4],
      salary: row[5],
    }));
    return parsedEmployees;
  } else {
    throw new Error('Invalid response format from API');
  }
};
