import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getPublicContent } from '@/lib/content.functions';
import { PageHeader, TrustNotice } from '@/components/site-shell';
import { PredictionTable } from '@/components/prediction-table';
import { CategoryButtons } from '@/components/category-buttons';
import { settled } from '@/lib/public-content';
const q=queryOptions({queryKey:['public-content'],queryFn:()=>getPublicContent()});
export const Route=createFileRoute('/predictions')({loader:({context})=>context.queryClient.ensureQueryData(q),head:()=>({meta:[{title:'Football Predictions — KAADA PREDICTZ'},{name:'description',content:'Browse current football predictions by market.'},{property:'og:title',content:'Football Predictions — KAADA PREDICTZ'},{property:'og:description',content:'Daily football selections with odds and analysis.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Page});
function Page(){const {data}=useSuspenseQuery(q);const pathname=useRouterState({select:s=>s.location.pathname});if(pathname!=='/predictions'&&pathname!=='/predictions/')return <Outlet/>;return <><PageHeader eyebrow="Prediction center" title="Football Predictions" copy="Published selections from the KAADA PREDICTZ analysts."/><div className="mx-auto max-w-7xl px-4 py-12 lg:px-8"><CategoryButtons categories={data.categories}/><PredictionTable items={data.predictions.filter(p=>!settled(p.status))}/><div className="mt-8"><TrustNotice/></div></div><Outlet/></>}
