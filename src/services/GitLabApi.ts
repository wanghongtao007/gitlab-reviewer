import axios, { AxiosInstance } from 'axios';
import LocalStorage from 'services/LocalStorage';
import { MergeRequestType, ProjectType } from 'types/GitLabTypes';
import { Project } from 'types/FormattedTypes';

export class GitLabApi {
  private axios: AxiosInstance;

  constructor(url: string, privateToken: string) {
    this.axios = axios.create({
      baseURL: url + '/api/v4',
      timeout: 5000,
      headers: { 'PRIVATE-TOKEN': privateToken }
    });
  }

  public async getMergeRequests(): Promise<MergeRequestType[]> {
    const mergeRequestsResponse = await this.axios.get('/merge_requests?state=opened&scope=all&order_by=updated_at');
    return mergeRequestsResponse.data;
  }

  public async getProjects(): Promise<ProjectType[]> {
    const mergeRequestsResponse = await this.axios.get('/projects?simple=true');
    return mergeRequestsResponse.data;
  }

  public async getBundledProjects(): Promise<Project[]> {

    let [projects, mergeRequests] = await Promise.all([
      this.getProjects(),
      this.getMergeRequests()
    ]);

    const bundledProjects: Project[] = projects.filter((project: ProjectType) => {

      return mergeRequests.find((mergeRequest: MergeRequestType) => mergeRequest.project_id === project.id);

    }).map((project: ProjectType): Project => {

      let mergeRequestsForProject = mergeRequests.filter((mergeRequest: MergeRequestType) => mergeRequest.project_id === project.id);

      return { ...project, mergeRequests: mergeRequestsForProject };
    });

    return bundledProjects;
  }

  public async isAuthenticated(): Promise<boolean> {
    try {
      await this.axios.get('/user');
      return true;
    } catch (error) {
      return false;
    }
  }
}

export function createGitLabApi(): GitLabApi {
  const url = LocalStorage.getUrl();
  const privateToken = LocalStorage.getPrivateToken();

  if (!url || !privateToken) {
    throw new Error('Url or Private Token not stored');
  }

  return new GitLabApi(url, privateToken);
}
