export default class OnlineStatusPlugin {
  init(henta) {
    this.enableOnline(henta);
    setInterval(() => this.enableOnline(henta), 900e3);
  }

  async enableOnline(henta) {
    try {
      await henta.vk.api.groups.enableOnline({ group_id: henta.groupId });
      henta.log('Включён онлайн сообщества.');
    } catch (e) {
      // ...
    }
  }
}
