import { MeetingRepositoryService } from "./MeetingRepositoryService.js";
//import { MeetingRepositoryRemoteFakeService } from "./MeetingRepositoryRemoteFakeService.js";

/**
 * Factory class to create instances of meet repository services.
 * 
 * This class provides a static method to get an appropriate instance
 * of a meeting repository service based on the specified repository type.
 * It cannot be instantiated.
 */
export class MeetingRepositoryFactory {
  constructor() {
    throw new Error('Cannot instantiate a MeetingRepositoryFactory object');
  }

  /**
   * Returns an instance of a meet repository service based on the given
   * repository type.
   *
   * @param {string} [repoType='local'] - The type of repository service to
   * create. Can be 'local' or 'remote'.
   * @returns {MeetingRepositoryService|MeetingRepositoryServerRemote} An instance
   * of the appropriate meet repository service.
   * @throws Will throw an error if the repository type is not recognized.
   */
  static get(repoType = 'local') {
    if (repoType === 'local') {
      return new MeetingRepositoryService();
    }
    // else if (repoType === 'remote') {
    //   return new MeetingRepositoryRemoteFakeService();
    // }
    else {
      throw new Error('Invalid repository type');
    }
  }
}
