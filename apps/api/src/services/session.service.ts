import { Database } from "../lib/database";
import { Inject, Service } from "../helpers/helpers.di";
import type { PgDatabase } from "../../@types/db.type";
import { session, sessionInsertSchema, sessionUpdateSchema } from "../models";
import { and, eq, ilike } from "drizzle-orm";
import type z from "zod";

@Service()
export class SessionService {
  static NAME = "SessionService";

  constructor(@Inject(Database.NAME) private readonly db: PgDatabase) {}

  /**
   * Note: Checks the session exists or not based on the title
   * @param input
   */
  public async existing<T>(input: { title?: string; session_id?: string }) {
    const conditions = [];

    if (input.title) conditions.push(ilike(session.title, input.title));
    if (input.session_id)
      conditions.push(eq(session.session_id, input.session_id));
    if (conditions.length == 0) return { success: false, data: undefined };

    const existing = await this.db.query.session.findFirst({
      where: conditions.length > 1 ? and(...conditions) : conditions[0],
    });

    return {
      success: !!existing,
      data: existing ?? undefined,
    };
  }

  /**
   * Note: Adds the new session based on the input provided
   * @param input SessionSchema
   * @returns
   */
  public async add(input: z.infer<typeof sessionInsertSchema>) {
    const existing = await this.existing({ title: input.title });

    if (existing.success) {
      throw new Error(
        "Duplicate Session. Session with provided title already exists"
      );
    }

    const [newSession] = await this.db
      .insert(session)
      .values({
        title: input.title,
        start_time: input.start_time,
        end_time: input.end_time,
        capacity: input.capacity,
        description: input.description,
        room: input.room,
      })
      .returning();

    if (!newSession) {
      throw new Error("Error while insertion");
    }

    return {
      success: true,
      data: newSession,
    };
  }

  /**
   * Note: Updates the session based on the session_id and updated information provided
   * @param input
   */
  public async update(input: z.infer<typeof sessionUpdateSchema>) {
    const existing = await this.existing({ title: input.session_id });

    if (!existing.success) {
      throw new Error("Session with provided ID doesn't exists");
    }

    // check for the duplicate conflict on title.
    const isTitleDuplicate = await this.existing({
      title: input.title,
    });

    if (isTitleDuplicate) {
      throw new Error(
        "Duplicate Session. Another session with this title already exists."
      );
    }

    const { data: existingSession } = existing;

    // update the data
    const [updatedSession] = await this.db
      .update(session)
      .set({
        title: input.title ?? existingSession?.title,
        start_time: input.start_time ?? existingSession?.start_time,
        end_time: input.end_time ?? existingSession?.end_time,
        capacity: input.capacity ?? existingSession?.capacity,
        description: input.description ?? existingSession?.description,
        room: input.room ?? existingSession?.room,
        updated_at: new Date(),
      })
      .where(eq(session.session_id, input.session_id))
      .returning();

    if (!updatedSession) {
      throw new Error("Error while updating the session.");
    }

    return {
      success: true,
      data: updatedSession,
    };
  }

  /**
   * Note: Delete the session
   * @param input
   * @returns
   */
  public async delete(input: { session_id: string }) {
    const existing = await this.existing({ title: input.session_id });

    if (!existing.success)
      throw new Error("Session with provided ID doesn't exists");

    const [deleted] = await this.db
      .delete(session)
      .where(eq(session.session_id, input.session_id))
      .returning();

    if (!deleted) throw new Error("Error occurred while deleing the session");

    return {
      success: true,
      data: deleted,
    };
  }
}
