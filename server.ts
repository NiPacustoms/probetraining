import express from 'express';
import type { Request, Response } from 'express';
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory cache for recent submissions (useful for audit and dev preview)
interface StoredInquiry {
  id: string;
  spielerName: string;
  geburtsjahr: number;
  jugend: string;
  kontaktperson: string;
  email: string;
  telefon: string;
  nachricht?: string;
  receivedAt: string;
  status: 'sent' | 'simulated';
}

const recentInquiries: StoredInquiry[] = [];

// Helper to escape HTML characters for email template security
function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generate the branded HTML email for DJK Spvgg Herten
function buildEmailHtml(data: {
  spielerName: string;
  geburtsjahr: number;
  jugend: string;
  kontaktperson: string;
  email: string;
  telefon: string;
  nachricht?: string;
  timestamp: string;
}): string {
  const safeSpieler = escapeHtml(data.spielerName);
  const safeJugend = escapeHtml(data.jugend);
  const safeKontakt = escapeHtml(data.kontaktperson);
  const safeEmail = escapeHtml(data.email);
  const safeTelefon = escapeHtml(data.telefon);
  const safeNachricht = data.nachricht ? escapeHtml(data.nachricht).replace(/\n/g, '<br/>') : '<em>Keine zusätzliche Nachricht angegeben</em>';

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neue Probetraining-Anfrage</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f5f7; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table role="presentation" width="100%" max-width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); border: 1px solid #e5e7eb;">
          
          <!-- Club Header Bar: Green, Red, White -->
          <tr>
            <td style="background-color: #14532d; padding: 28px 32px; text-align: left; border-bottom: 4px solid #dc2626;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="display: inline-block; background-color: #ffffff; color: #14532d; font-weight: 800; font-size: 13px; padding: 4px 10px; border-radius: 4px; letter-spacing: 1px; text-transform: uppercase;">
                      DJK Spvgg Herten 1907 e.V.
                    </div>
                    <h1 style="color: #ffffff; margin: 12px 0 4px 0; font-size: 24px; font-weight: 700; line-height: 1.25;">
                      Neue Probetraining-Anfrage
                    </h1>
                    <p style="color: #bbf7d0; margin: 0; font-size: 14px;">
                      Jugendabteilung · Kampfbahn Katzenbusch
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Intro Info Box -->
          <tr>
            <td style="padding: 24px 32px 12px 32px;">
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px 18px; color: #166534; font-size: 14px; line-height: 1.5;">
                <strong>Eingang:</strong> ${data.timestamp} Uhr<br/>
                Über das Online-Formular auf der offiziellen Probetraining-Webseite.
              </div>
            </td>
          </tr>

          <!-- Player Details Section -->
          <tr>
            <td style="padding: 12px 32px 8px 32px;">
              <h2 style="font-size: 17px; font-weight: 700; color: #111827; margin: 0 0 14px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
                Angaben zum Spieler / zur Spielerin
              </h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="6" style="font-size: 14px;">
                <tr>
                  <td width="38%" style="color: #6b7280; font-weight: 500;">Spielername:</td>
                  <td style="color: #111827; font-weight: 700; font-size: 15px;">${safeSpieler}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-weight: 500;">Geburtsjahr:</td>
                  <td style="color: #111827; font-weight: 600;">${data.geburtsjahr}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-weight: 500;">Gewünschte Jugend:</td>
                  <td style="color: #15803d; font-weight: 700;">
                    <span style="background-color: #dcfce7; padding: 3px 8px; border-radius: 4px; display: inline-block;">
                      ${safeJugend}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Person Section -->
          <tr>
            <td style="padding: 12px 32px 8px 32px;">
              <h2 style="font-size: 17px; font-weight: 700; color: #111827; margin: 12px 0 14px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
                Sorgeberechtigte Kontaktperson
              </h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="6" style="font-size: 14px;">
                <tr>
                  <td width="38%" style="color: #6b7280; font-weight: 500;">Name (Erziehungsberechtigte/r):</td>
                  <td style="color: #111827; font-weight: 600;">${safeKontakt}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-weight: 500;">E-Mail-Adresse:</td>
                  <td style="color: #111827;">
                    <a href="mailto:${safeEmail}" style="color: #166534; font-weight: 600; text-decoration: underline;">
                      ${safeEmail}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-weight: 500;">Telefonnummer:</td>
                  <td style="color: #111827;">
                    <a href="tel:${safeTelefon.replace(/\s+/g, '')}" style="color: #111827; font-weight: 600; text-decoration: none;">
                      ${safeTelefon}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Section -->
          <tr>
            <td style="padding: 12px 32px 20px 32px;">
              <h2 style="font-size: 17px; font-weight: 700; color: #111827; margin: 12px 0 14px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
                Nachricht / Vorerfahrung
              </h2>
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px; font-size: 14px; line-height: 1.6; color: #374151;">
                ${safeNachricht}
              </div>
            </td>
          </tr>

          <!-- Direct Reply Callout for Youth Coordinators -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 14px 18px; color: #991b1b; font-size: 13px; line-height: 1.5;">
                <strong>Hinweis für die Jugendleitung:</strong><br/>
                Du kannst einfach auf diese E-Mail antworten, um direkt per E-Mail Kontakt mit <em>${safeKontakt}</em> (${safeEmail}) aufzunehmen, oder die hinterlegte Telefonnummer wählen.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #111827; padding: 24px 32px; text-align: center; color: #9ca3af; font-size: 12px; line-height: 1.6;">
              <p style="margin: 0 0 6px 0; color: #f3f4f6; font-weight: 600;">
                DJK Spvgg Herten 1907 e.V. · Jugendabteilung
              </p>
              <p style="margin: 0 0 6px 0;">
                Kampfbahn Katzenbusch · Katzenbuschstraße 1–3, 45699 Herten
              </p>
              <p style="margin: 0; color: #6b7280;">
                Empfängeradresse: jugend@djkspvggherten.de · DSGVO-konforme Registrierung
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Plain text alternative
function buildEmailText(data: {
  spielerName: string;
  geburtsjahr: number;
  jugend: string;
  kontaktperson: string;
  email: string;
  telefon: string;
  nachricht?: string;
  timestamp: string;
}): string {
  return `
NEUE PROBETRAINING-ANFRAGE - DJK SPVGG HERTEN 1907 E.V.
======================================================
Eingangszeitpunkt: ${data.timestamp} Uhr

SPIELER/IN:
- Name: ${data.spielerName}
- Geburtsjahr: ${data.geburtsjahr}
- Gewünschte Jugend: ${data.jugend}

SORGEBERECHTIGTE KONTAKTPERSON:
- Name: ${data.kontaktperson}
- E-Mail: ${data.email}
- Telefon: ${data.telefon}

NACHRICHT / VORERFAHRUNG:
${data.nachricht || 'Keine Nachricht angegeben'}

======================================================
DJK Spvgg Herten 1907 e.V. - Kampfbahn Katzenbusch
Herner Str. 67, 45699 Herten | jugend@djkspvggherten.de
  `.trim();
}

// API Route: Submit Probetraining Form
app.post('/api/probetraining', async (req: Request, res: Response) => {
  try {
    const {
      spielerName,
      geburtsjahr,
      jugend,
      kontaktperson,
      email,
      telefon,
      nachricht,
      dsgvoAccepted,
      honeypot,
      formStartTime
    } = req.body;

    // 1. Spam Prevention: Honeypot check
    // If the hidden honeypot field contains any value, it's an automated bot
    if (honeypot && String(honeypot).trim() !== '') {
      console.warn('[SPAM BLOCKED] Honeypot field filled by client.');
      return res.status(400).json({
        success: false,
        error: 'Die Anfrage wurde durch den Spam-Schutz abgewiesen.'
      });
    }

    // 2. Spam Prevention: Filling duration check (humans need at least ~1.5s to fill)
    if (formStartTime && typeof formStartTime === 'number') {
      const elapsed = Date.now() - formStartTime;
      if (elapsed < 1200) {
        console.warn(`[SPAM BLOCKED] Form submitted too quickly (${elapsed}ms).`);
        return res.status(400).json({
          success: false,
          error: 'Das Formular wurde verdächtig schnell übermittelt. Bitte überprüfe deine Angaben.'
        });
      }
    }

    // 3. Server-side Data Validation
    const trimmedSpieler = typeof spielerName === 'string' ? spielerName.trim() : '';
    const parsedGeburtsjahr = parseInt(String(geburtsjahr), 10);
    const trimmedJugend = typeof jugend === 'string' ? jugend.trim() : '';
    const trimmedKontakt = typeof kontaktperson === 'string' ? kontaktperson.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    const trimmedTelefon = typeof telefon === 'string' ? telefon.trim() : '';
    const trimmedNachricht = typeof nachricht === 'string' ? nachricht.trim() : '';

    if (!trimmedSpieler || trimmedSpieler.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Bitte gib den vollständigen Namen des Spielers oder der Spielerin an (mind. 2 Zeichen).'
      });
    }

    const currentYear = new Date().getFullYear();
    if (isNaN(parsedGeburtsjahr) || parsedGeburtsjahr < currentYear - 25 || parsedGeburtsjahr > currentYear) {
      return res.status(400).json({
        success: false,
        error: `Bitte gib ein gültiges Geburtsjahr an (zwischen ${currentYear - 22} und ${currentYear}).`
      });
    }

    if (!trimmedJugend) {
      return res.status(400).json({
        success: false,
        error: 'Bitte wähle eine Jugendmannschaft aus.'
      });
    }

    if (!trimmedKontakt || trimmedKontakt.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Bitte gib den Namen der sorgeberechtigten Kontaktperson an.'
      });
    }

    // Simple robust email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Bitte gib eine gültige E-Mail-Adresse an.'
      });
    }

    if (!trimmedTelefon || trimmedTelefon.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Bitte gib eine erreichbare Telefonnummer für eventuelle Rückfragen an.'
      });
    }

    if (!dsgvoAccepted) {
      return res.status(400).json({
        success: false,
        error: 'Bitte bestätige die Einwilligung zur DSGVO-konformen Verarbeitung deiner Daten.'
      });
    }

    // Format timestamp in German format
    const now = new Date();
    const formattedTimestamp = now.toLocaleString('de-DE', {
      timeZone: 'Europe/Berlin',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const emailPayload = {
      spielerName: trimmedSpieler,
      geburtsjahr: parsedGeburtsjahr,
      jugend: trimmedJugend,
      kontaktperson: trimmedKontakt,
      email: trimmedEmail,
      telefon: trimmedTelefon,
      nachricht: trimmedNachricht,
      timestamp: formattedTimestamp
    };

    const emailHtml = buildEmailHtml(emailPayload);
    const emailText = buildEmailText(emailPayload);

    // 4. Send Email via Resend if RESEND_API_KEY is configured
    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = 'jugend@djkspvggherten.de';
    const fromAddress = process.env.EMAIL_FROM || 'DJK Spvgg Herten <onboarding@resend.dev>';

    let deliveryStatus: 'sent' | 'simulated' = 'simulated';
    let deliveryId = `djk-${Date.now()}`;

    if (apiKey && apiKey.trim().length > 0) {
      try {
        const resend = new Resend(apiKey);
        const { data, error } = await resend.emails.send({
          from: fromAddress,
          to: [recipientEmail],
          replyTo: trimmedEmail,
          subject: `Neue Probetraining-Anfrage: ${trimmedSpieler} (${trimmedJugend}, Jg. ${parsedGeburtsjahr})`,
          html: emailHtml,
          text: emailText,
        });

        if (error) {
          console.error('[RESEND ERROR]', error);
          return res.status(500).json({
            success: false,
            error: `Der E-Mail-Versand ist fehlgeschlagen: ${error.message}. Bitte überprüfe deine Angaben und versuche es erneut.`
          });
        }

        deliveryStatus = 'sent';
        if (data?.id) {
          deliveryId = data.id;
        }
        console.log(`[EMAIL DISPATCHED] Successfully sent email to ${recipientEmail} via Resend. ID: ${deliveryId}`);
      } catch (sendError: any) {
        console.error('[RESEND EXCEPTION]', sendError);
        return res.status(500).json({
          success: false,
          error: `E-Mail-Serverfehler: ${sendError.message || 'Unbekannter Verbindungsfehler'}. Bitte versuche es erneut.`
        });
      }
    } else {
      // In development / testing environment when RESEND_API_KEY is not yet added in environment
      console.log(`[DJK HERTEN - SIMULATED EMAIL DISPATCH]`);
      console.log(`To: ${recipientEmail}`);
      console.log(`Reply-To: ${trimmedEmail}`);
      console.log(`Subject: Neue Probetraining-Anfrage: ${trimmedSpieler} (${trimmedJugend})`);
      console.log(`Spieler: ${trimmedSpieler}, Jg. ${parsedGeburtsjahr}, Kontakt: ${trimmedKontakt}, Tel: ${trimmedTelefon}`);
      console.log(`Hinweis: RESEND_API_KEY ist in der Umgebung nicht gesetzt. Anfrage wurde serverseitig protokolliert.`);
      deliveryStatus = 'simulated';
    }

    // Record submission in recent list
    const inquiryRecord: StoredInquiry = {
      id: deliveryId,
      spielerName: trimmedSpieler,
      geburtsjahr: parsedGeburtsjahr,
      jugend: trimmedJugend,
      kontaktperson: trimmedKontakt,
      email: trimmedEmail,
      telefon: trimmedTelefon,
      nachricht: trimmedNachricht,
      receivedAt: formattedTimestamp,
      status: deliveryStatus
    };
    recentInquiries.unshift(inquiryRecord);
    if (recentInquiries.length > 50) {
      recentInquiries.pop();
    }

    // 5. Successful Response
    return res.status(200).json({
      success: true,
      message: 'Vielen Dank! Deine Probetraining-Anfrage ist bei uns eingegangen. Unsere Jugendleitung wird sich bei dir melden.',
      id: deliveryId,
      recipient: recipientEmail,
      demoMode: deliveryStatus === 'simulated',
      data: {
        spielerName: trimmedSpieler,
        jugend: trimmedJugend,
        geburtsjahr: parsedGeburtsjahr,
        kontaktperson: trimmedKontakt,
        email: trimmedEmail
      }
    });

  } catch (error: any) {
    console.error('[SERVER ERROR in /api/probetraining]:', error);
    return res.status(500).json({
      success: false,
      error: 'Es ist ein unerwarteter Serverfehler aufgetreten. Bitte versuche es erneut.'
    });
  }
});

// Diagnostic & Status Endpoint
app.get('/api/status', (_req: Request, res: Response) => {
  const hasResend = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0);
  res.json({
    status: 'healthy',
    club: 'DJK Spvgg Herten 1907 e.V.',
    department: 'Jugendabteilung',
    recipientEmail: 'jugend@djkspvggherten.de',
    emailServiceConfigured: hasResend,
    recentInquiriesCount: recentInquiries.length
  });
});

// Recent inquiries inspection (for preview verification)
app.get('/api/probetraining/latest', (_req: Request, res: Response) => {
  res.json({
    inquiries: recentInquiries.slice(0, 10)
  });
});

// Frontend Vite Integration
async function startServer() {
  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`DJK Spvgg Herten Probetraining server running on port ${PORT} (Prod: ${IS_PROD})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
