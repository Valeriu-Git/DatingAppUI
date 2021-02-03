import { LoginService } from '../../_services/login.service';

export function loginServiceFactory(
  provider: LoginService
): () => Promise<boolean> {
  return () => provider.load();
}
