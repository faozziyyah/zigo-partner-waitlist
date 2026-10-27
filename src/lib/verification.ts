/**
 * VerificationProvider interface for Phase 2 WhatsApp verification.
 * Currently disabled behind VERIFY_WHATSAPP=false flag.
 */

export interface VerificationResult {
  success: boolean;
  message: string;
  expiresAt?: string;
}

export interface VerificationProvider {
  sendCode(phoneE164: string): Promise<VerificationResult>;
  verifyCode(phoneE164: string, code: string): Promise<boolean>;
}

interface StoredCode {
  code: string;
  expiresAt: number;
}

const memoryCodeStore = new Map<string, StoredCode>();

export class StubWhatsAppVerificationProvider implements VerificationProvider {
  private readonly expiryMs = 5 * 60 * 1000; // 5 minutes

  async sendCode(phoneE164: string): Promise<VerificationResult> {
    // Phase 2 stub: generate a 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + this.expiryMs;

    memoryCodeStore.set(phoneE164, { code, expiresAt });

    // Note: NEVER log phone numbers in production logs per security requirements
    console.info(`[StubWhatsAppVerification] Generated 6-digit code with 5-minute expiry.`);

    return {
      success: true,
      message: "Verification code sent to WhatsApp.",
      expiresAt: new Date(expiresAt).toISOString(),
    };
  }

  async verifyCode(phoneE164: string, code: string): Promise<boolean> {
    const entry = memoryCodeStore.get(phoneE164);
    if (!entry) return false;

    if (Date.now() > entry.expiresAt) {
      memoryCodeStore.delete(phoneE164);
      return false;
    }

    const isValid = entry.code === code.trim();
    if (isValid) {
      memoryCodeStore.delete(phoneE164);
    }
    return isValid;
  }
}

export const isWhatsAppVerificationEnabled =
  process.env.VERIFY_WHATSAPP === "true";

export const verificationProvider: VerificationProvider =
  new StubWhatsAppVerificationProvider();
