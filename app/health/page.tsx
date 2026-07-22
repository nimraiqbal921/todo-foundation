async function getHealthData() {
  return {
    status: "Healthy ✅",
    time: new Date().toLocaleString(),
  };
}

export default async function HealthPage() {
  const data = await getHealthData();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-4">Health Check</h1>

      <p>
        <strong>Status:</strong> {data.status}
      </p>

      <p>
        <strong>Checked At:</strong> {data.time}
      </p>
    </main>
  );
}