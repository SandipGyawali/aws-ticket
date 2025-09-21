import { Service } from "../helpers/helpers.di";
import Papa from "papaparse";

@Service()
export class CsvToJsonService {
  constructor() {}

  /**
   * This method parses the csv string data and converts it to the json/js-object.
   * @param csvData
   * @returns Array<JSON/Object>
   *
   */
  async parse(csvData: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true, //auto convert numbers/boolean
        complete: (results) => {
          resolve(results.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  /**
   * This method parsed the csv file buffer data and converts it to the json/js-object
   * @param fileBuffer
   * @returns
   */
  async parseBuffer(fileBuffer: Buffer): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(fileBuffer.toString("utf-8"), {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => resolve(results.data),
        error: (err: any) => reject(err),
      });
    });
  }
}
