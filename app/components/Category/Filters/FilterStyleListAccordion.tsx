import { Image } from "@shopify/hydrogen";
import { useState } from "react";
import { styles } from "./filteroption.data";
import type { StyleTypes } from "./filteroption.types";

function FilterStyleListAccordion() {
	const [open, setOpen] = useState<StyleTypes | null>("Style");
	const [selected, setSelected] = useState("Classic Solitaire");
	const [seeMore, setSeeMore] = useState(false);

	const sections: StyleTypes[] = ["Style", "Metal", "Stonetype", "Shape", "Setting Type"];

	return (
		<div className="w-full max-w-sm text-sm">
			{sections.map((section) => (
				<div key={section} className="border-b border-gray-200">
					<button
						onClick={() => {
							setOpen(open === section ? null : section)
							setSeeMore(false)
						}}
						className="flex w-full items-center justify-between py-4 font-medium"
					>
						{section}
						<Image src="/assets/images/icons/c_down.svg" alt="Down Icon" width={20}/>
					</button>


					{(open && open == section) && (
						<div className="pb-4">
							<ul className="space-y-2">
								{styles[open].slice(0, seeMore ? Infinity : 4).map((item, index) => (
									<li key={item.label}>
										<label htmlFor={`radio-${item.label}`} className="cursor-pointer flex items-center gap-1">
											<input
												id={`radio-${item.label}`}
												type="radio"
												name="style"
												checked={selected === item.label}
												onChange={() => {
													setSelected(item.label)
												}}
												className="h-3 w-3 accent-[#007bff]"
											/>
											<Image src="/assets/images/solitaire.avif" alt={item.label} width={30}/>
											<span className="text-gray-900 text-[12px] tracking-[0.8px]">{item.label}</span>
										</label>
									</li>
								))}
							</ul>

							<button className="mt-4 text-orange-500" onClick={() => setSeeMore(!seeMore)}>{seeMore ? "See Less" : "See More"}</button>
						</div>
					)}
				</div>
			))}
		</div>
	)
}

export default FilterStyleListAccordion;