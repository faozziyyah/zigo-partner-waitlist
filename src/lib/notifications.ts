import { SubmissionRecord } from "./validation";

/**
 * notify() stub called on each new submission.
 * Later: integrate WhatsApp Business API or team Slack / email alert.
 * Rule: NEVER log phone numbers per prompt security instructions.
 */
export async function notifyNewPartnerSubmission(submission: SubmissionRecord): Promise<void> {
  // Sanitize reference code and captain name without logging raw phone number
  const boatSummary = `${submission.boats_count} boat(s) [${submission.boat_types.join(", ")}]`;
  const jettySummary = submission.preferred_jetty === "other"
    ? `Custom jetty (${submission.jetty_other})`
    : submission.preferred_jetty;

  console.info(
    `[Notification Stub] New Founding Boat Partner Registered: ref=${submission.reference_code}, captain=${submission.captain_name}, fleet=${boatSummary}, jetty=${jettySummary}`
  );

  // TODO: Add webhook to Zigo Operations channel or WhatsApp Business dispatch
}
