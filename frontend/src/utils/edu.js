// Helpers for the education (Vzdělávání) section.

// A program is publicly visible only when published and within its optional
// seasonal publish window. Draft / hidden programs are never shown publicly.
export function isProgramLive(p) {
  if (!p) return false;
  if (p.status !== "published") return false;
  const now = new Date();
  if (p.publishFrom) {
    const from = new Date(p.publishFrom);
    if (!isNaN(from.getTime()) && now < from) return false;
  }
  if (p.publishTo) {
    const to = new Date(p.publishTo);
    // include the whole "to" day
    if (!isNaN(to.getTime())) {
      const end = new Date(to.getTime());
      end.setHours(23, 59, 59, 999);
      if (now > end) return false;
    }
  }
  return true;
}

const byOrder = (a, b) => (a.order ?? 999) - (b.order ?? 999);

export function publishedCategories(edu) {
  return [...(edu?.categories || [])]
    .filter((c) => c.published !== false)
    .sort(byOrder);
}

export function liveProgramsInCategory(edu, categoryId, { featuredOnly = false } = {}) {
  return [...(edu?.programs || [])]
    .filter((p) => p.categoryId === categoryId && isProgramLive(p) && (!featuredOnly || p.featured))
    .sort(byOrder);
}

export function findProgramBySlug(edu, slug) {
  return (edu?.programs || []).find((p) => p.slug === slug) || null;
}

export function categoryById(edu, id) {
  return (edu?.categories || []).find((c) => c.id === id) || null;
}
