export interface Subscription {
    id: number;
    amount: number;
    cron: string;
    user_id: number;
    code: string;
    created_at: Date | null;
    updated_at: Date | null;
}