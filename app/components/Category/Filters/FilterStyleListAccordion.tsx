import { Image } from "@shopify/hydrogen";
import { useState } from "react";
import type { StyleTypes } from "./filteroption.types";


interface FilterStyleListAccordionProps {
	dynamicFilters: any[];
	selectedFilters: { id: string; value: string }[];
	onFilterChange: (filterId: string, value: string) => void;
}

function FilterStyleListAccordion({ dynamicFilters, selectedFilters = [], onFilterChange }: FilterStyleListAccordionProps) {
	const [open, setOpen] = useState(dynamicFilters[0]?.label || null);
	const [seeMore, setSeeMore] = useState(false);

	return (
		<div className="w-full max-w-sm text-sm">
			{dynamicFilters.map((filter) => (
				<div key={filter.label} className="border-b border-gray-200">
					<button
						onClick={() => {
							setOpen(open === filter.label ? null : filter.label);
							setSeeMore(false);
						}}
						className="flex w-full items-center justify-between py-4 font-medium"
					>
						{filter.label}
						<Image src="/assets/images/icons/c_down.svg" alt="Down Icon" width={20}/>
					</button>

					{(open && open === filter.label) && (
						<div className="pb-4">
							<ul className="space-y-2">
								{filter.values
									.filter((option: any) => {
										if (
											filter.label &&
											filter.label.toLowerCase() === "metal"
										) {
											const name = option.metaobject.name?.toLowerCase() || "";
											// console.log("name list", name);
											return (
												name.includes("9k") ||
												name.includes("silver") ||
												name.includes("platinum")
											);
										}
										return option.metaobject && option.metaobject.code && option.metaobject.code.trim() !== "";
									})
									.slice(0, seeMore ? Infinity : 4)
									.map((option: any, index: number) => {
									const code = option.metaobject?.code?.toLowerCase?.() || option.label.toLowerCase();
									const label = filter.label ? filter.label.toLowerCase() : "";
									const isMetalOrStoneType = ["metal", "stonetype", "stone type"].includes(label);
									const imageName = ["shape", "setting type"].includes(label)
										? `${code}.svg`
										: `${code}_100x50.png`;
									const imgWidth = isMetalOrStoneType ? 20 : 40;
									const imgHeight = isMetalOrStoneType ? 20 : 20;
									const isRadio = ["style", "metal", "stone type", "stonetype", "shape"].includes(label);
									// Determine if this option is selected from selectedFilters
									const filterId = filter.id || filter.label;
									const isSelected = Array.isArray(selectedFilters) && selectedFilters.some(f => (f.id === filterId) && (f.value === option.label || f.value === option.metaobject?.id));
									   // Add required attributes for filter_param logic
									   const groupId = option.metaobject?.filter_group_id || option.metaobject?.group_id || option.metaobject?.groupId;
									   const filterIdAttr = option.metaobject?.filter_id || option.metaobject?.id || option.metaobject?.filterId;
									   return (
										   <li key={option.id || option.label}
											   data-code={code}
											   data-metaobject-id={option.metaobject?.id || ''}
											   data-label={option.label}
											   data-filter_group_id={groupId || ''}
											   data-filter_id={filterIdAttr || ''}
											   {...Object.entries(option.metaobject)
												   .filter(([k]) => k !== 'code')
												   .reduce((acc, [k, v]) => {
													   acc[`data-${k.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = v;
													   return acc;
												   }, {} as Record<string, any>)}
										   >
											<a href={option.url || ''}>
												<label htmlFor={`filter-${filter.label}-${option.label}`} className="cursor-pointer flex items-center gap-1">
													<input
														id={`filter-${filter.label}-${option.label}`}
														type={isRadio ? "radio" : "checkbox"}
														name={filter.label}
														checked={isSelected}
														onChange={() => {
															if (onFilterChange) {
																onFilterChange(filterId, option.metaobject?.id || option.label);
															}
														}}
														className="h-3 w-3 accent-[#007bff]"
													/>
													<Image
														src={`https://cdn.shopify.com/s/files/1/0933/1789/0388/files/${imageName}`}
														alt={option.label}
														width={imgWidth}
														height={imgHeight}
														style={{ width: imgWidth, height: imgHeight, display: "block", marginLeft: isMetalOrStoneType ? 10 : 0, marginRight: isMetalOrStoneType ? 10 : 0 }}
													/>
													<span className="text-gray-900 text-[12px] tracking-[0.8px]">
														{option.label}
														{typeof option.count === 'number' && (
															<span className="ml-1 text-gray-500">({option.count})</span>
														)}
													</span>
												</label>
											</a>
										</li>
									);
								})}
							</ul>

							{filter.values.length > 4 && (
								<button className="mt-4 text-orange-500" onClick={() => setSeeMore(!seeMore)}>
									{seeMore ? "See Less" : "See More"}
								</button>
							)}
						</div>
					)}
				</div>
			))}
		</div>
	)
}

export default FilterStyleListAccordion;