function parsePage(query, { defaultLimit = 25, maxLimit = 100 } = {}) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  let limit = parseInt(query.limit, 10) || defaultLimit;
  limit = Math.min(Math.max(limit, 1), maxLimit);
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

function buildMeta({ page, limit, total }) {
  const pages = Math.ceil(total / limit) || 1;
  return { page, limit, total, pages, hasNext: page < pages, hasPrev: page > 1 };
}

module.exports = { parsePage, buildMeta };
