export default function makeMsg(data) {
  if (typeof data === 'string') {
    return { message: data };
  }

  const msgData = Array.isArray(data) ? { message: data } : data;
  if (msgData.message && Array.isArray(msgData.message)) {
    msgData.message = msgData.message.filter(v => v).join('\n');
  }

  return msgData;
}
