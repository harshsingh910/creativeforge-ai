import {
  HealthStatus,
  AgentResponse,
  ContentAgentFormData,
  ContentAgentOutput,
  CopywritingAgentFormData,
  CopywritingAgentOutput,
  VideoAgentFormData,
  VideoAgentOutput,
} from '../types';

const API_BASE = '/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {}),
        },
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorDetail = data?.error || data?.detail || `Server responded with status ${response.status}`;
        throw new Error(errorDetail);
      }

      return data as T;
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        throw new Error(
          'Unable to communicate with CreativeForge AI backend (connection refused). Please ensure the FastAPI server is running on port 8000.'
        );
      }
      throw err;
    }
  }

  async checkHealth(): Promise<HealthStatus> {
    return this.request<HealthStatus>('/health');
  }

  async generateContent(payload: ContentAgentFormData): Promise<AgentResponse<ContentAgentOutput>> {
    return this.request<AgentResponse<ContentAgentOutput>>('/agents/content/generate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async generateCopywriting(payload: CopywritingAgentFormData): Promise<AgentResponse<CopywritingAgentOutput>> {
    return this.request<AgentResponse<CopywritingAgentOutput>>('/agents/copywriting/generate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async generateVideo(payload: VideoAgentFormData): Promise<AgentResponse<VideoAgentOutput>> {
    return this.request<AgentResponse<VideoAgentOutput>>('/agents/video/generate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}

export const api = new ApiService();
