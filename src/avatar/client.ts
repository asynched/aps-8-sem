export interface AvatarService {
  getAvatar(username: string): string
}

export class DicebearAvatarService implements AvatarService {
  private readonly baseUrl = 'https://api.dicebear.com/7.x/initials/svg'

  getAvatar(username: string): string {
    return `${this.baseUrl}?seed=${username}.svg`
  }
}

export const avatar = new DicebearAvatarService()
