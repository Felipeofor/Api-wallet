import connector from '../../../../common/persistence/mysql.persistence';
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../subscription.repository';

export class SubscriptionMySQLRepository implements SubscriptionRepository {
    public async all(): Promise<Subscription[]> {
        const [rows] = await connector.execute('SELECT * FROM wallet_subscriptions ORDER BY id DESC');

        return rows as Subscription[];
    }

    public async find(id: Number): Promise<Subscription | null> {
        const [rows]: any[] = await connector.execute('SELECT * FROM wallet_subscriptions WHERE id = ?', [id]);

        if(rows.length){
            return rows[0] as Subscription;
        }

        return null;
    }

    public async store(entry: Subscription): Promise<void>{
        const now = new Date();

        await connector.execute(
            'INSERT INTO wallet_subscriptions (user_id, code, amount, cron, created_at) VALUES (?, ?, ?, ?, ?)', [
            entry.user_id,
            entry.code,
            entry.amount,
            entry.cron,
            now
        ]);
    }

    public async update(entry: Subscription): Promise<void>{
        const now = new Date();

        await connector.execute(
            'UPDATE wallet_subscriptions SET user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ? WHERE id = ?', [
            entry.user_id,
            entry.code,
            entry.amount,
            entry.cron,
            now,
            entry.id
        ]);
    }

    public async remove(id: Number): Promise<void>{
        await connector.execute('DELETE FROM wallet_subscriptions WHERE id = ?', [id]);
    }
}