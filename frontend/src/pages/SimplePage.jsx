import { Link, NavLink, useLocation } from "react-router-dom";
import { getSimplePageConfig, productSidebarGroups } from "../content/simplePages";

function Breadcrumbs({ items }) {
  if (!items?.length) return null;
  return (
    <nav className="text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.href}-${item.label}`} className="inline-flex items-center gap-2">
              {idx > 0 && <span className="text-slate-300">/</span>}
              {isLast ? (
                <span className="font-medium text-slate-700">{item.label}</span>
              ) : (
                <Link to={item.href} className="hover:text-cyan-700">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function ProductSidebar({ activePath }) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-extrabold uppercase tracking-wide text-slate-800">Danh mục sản phẩm</h2>
      <div className="mt-4 space-y-5">
        {productSidebarGroups.map((group) => (
          <section key={group.title}>
            <h3 className="text-sm font-bold text-slate-700">{group.title}</h3>
            <div className="mt-2 space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm transition ${
                      isActive || activePath === item.href
                        ? "bg-cyan-50 font-semibold text-cyan-900 ring-1 ring-cyan-200"
                        : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
}

function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="list-disc space-y-2 pl-5 text-slate-700">
      {items.map((it) => (
        <li key={it} className="leading-7">
          {it}
        </li>
      ))}
    </ul>
  );
}

export default function SimplePage({ title }) {
  const { pathname } = useLocation();
  const config = getSimplePageConfig(pathname, title);
  const hasSidebar = config.sidebar === "products";

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      <Breadcrumbs items={config.breadcrumbs} />

      <div className="mt-5 grid gap-6 lg:grid-cols-12">
        {hasSidebar && (
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <ProductSidebar activePath={pathname} />
            </div>
          </div>
        )}

        <article className={hasSidebar ? "lg:col-span-8" : "lg:col-span-12"}>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">{config.title}</h1>

            {config.hero && (
              <section className="mt-6 rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-cyan-900">{config.hero.kicker}</p>
                <div className="mt-3">
                  <BulletList items={config.hero.bullets} />
                </div>
              </section>
            )}

            <div className="mt-8 space-y-8">
              {config.sections?.map((section) => (
                <section key={section.heading} className="space-y-3">
                  <h2 className="text-xl font-bold text-slate-800 md:text-2xl">{section.heading}</h2>
                  {section.text && <p className="leading-7 text-slate-700">{section.text}</p>}
                  <BulletList items={section.bullets} />

                  {section.blocks?.length ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      {section.blocks.map((block) => (
                        <article key={block.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                          <h3 className="text-base font-bold text-slate-800">{block.title}</h3>
                          {block.text && <p className="mt-2 leading-7 text-slate-700">{block.text}</p>}
                          {block.bullets?.length ? (
                            <div className="mt-2">
                              <BulletList items={block.bullets} />
                            </div>
                          ) : null}
                        </article>
                      ))}
                    </div>
                  ) : null}
                </section>
              ))}
            </div>

            {config.source?.href && (
              <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-600">
                  {config.source.label}:{" "}
                  <a
                    href={config.source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-cyan-700 hover:text-cyan-800"
                  >
                    {config.source.href}
                  </a>
                </p>
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
