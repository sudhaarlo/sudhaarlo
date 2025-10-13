import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExpertHistory } from '../../services/api';

export default function WorkHistory() {
  const { id: expertId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getExpertHistory(expertId)
      .then((d) => {
        // backend returns { ok?: true, jobs?: [...] } or just array
        const payload = d.jobs || d;
        if (mounted) setJobs(payload);
      })
      .catch((e) => mounted && setError(e.message || 'Failed to load'))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [expertId]);

  return (
    <div className="pt-24 container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Work History</h1>

      {loading && <div className="text-gray-500">Loading work history...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {!loading && !jobs.length && <div className="text-gray-500">No jobs found for this expert.</div>}

      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job._id || job.id} className="p-4 border rounded-lg">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{job.serviceCategory || job.service || 'Service'}</div>
                <div className="text-sm text-gray-500">{job.date} {job.time}</div>
              </div>
              <div className="text-right">
                <div className="font-bold">{job.status}</div>
                <div className="text-sm text-gray-600">Customer: {job.customer?.name || job.customerName || '—'}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


