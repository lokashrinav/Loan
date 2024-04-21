				import worker, * as OTHER_EXPORTS from "C:\\Users\\rohan\\Downloads\\Loan\\backendBitCamp2024\\src\\index.ts";
				import * as __MIDDLEWARE_0__ from "C:\\Users\\rohan\\Downloads\\Loan\\backendBitCamp2024\\node_modules\\wrangler\\templates\\middleware\\middleware-ensure-req-body-drained.ts";
import * as __MIDDLEWARE_1__ from "C:\\Users\\rohan\\Downloads\\Loan\\backendBitCamp2024\\node_modules\\wrangler\\templates\\middleware\\middleware-miniflare3-json-error.ts";
				
				worker.middleware = [
					__MIDDLEWARE_0__.default,__MIDDLEWARE_1__.default,
					...(worker.middleware ?? []),
				].filter(Boolean);
				
				export * from "C:\\Users\\rohan\\Downloads\\Loan\\backendBitCamp2024\\src\\index.ts";
				export default worker;