export type ServiceCategory =
  | "data"
  | "internet"
  | "cloud"
  | "digital"
  | "voice";

export interface Service {
  id: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  features: string[];
  url: string;
  tags?: string[];
  /** Đối tượng khách hàng / use case phù hợp */
  idealFor?: string[];
  /** SLA cam kết nếu có */
  sla?: string;
  /** Mô hình tính phí (cho cloud) */
  pricingModel?: string;
}

export const HITC_PROFILE = {
  name: "HITC — Hanoi Information Technology Corporation",
  tagline:
    "Nhà cung cấp hạ tầng viễn thông, Data Center, Cloud và chuyển đổi số toàn diện.",
  about:
    "HITC là doanh nghiệp công nghệ — viễn thông sở hữu hạ tầng truyền dẫn 15.000+ km cáp quang Bắc–Nam, 07 hướng kết nối quốc tế, Data Center EcoDC đạt chuẩn Tier 3 và hệ sinh thái dịch vụ phục vụ hơn 1.000 khách hàng doanh nghiệp.",
  mission:
    "Kiến tạo hạ tầng số an toàn, ổn định, mở đường cho chuyển đổi số bền vững của doanh nghiệp và tổ chức Việt Nam.",
  vision:
    "Trở thành nhà cung cấp hạ tầng số và dịch vụ cloud hàng đầu khu vực, đồng hành cùng khách hàng trong kỷ nguyên dữ liệu.",
  website: "https://www.hitc.vn",
} as const;

export const HITC_STATS = {
  cableKm: 15000,
  customers: 1000,
  internationalGateways: 7,
  dataCenterTier: "Tier 3",
} as const;

export const HITC_SERVICES: Service[] = [
  {
    id: "colocation",
    title: "Chỗ đặt máy chủ (Colocation)",
    category: "data",
    summary:
      "Thuê chỗ đặt máy chủ tại EcoDC Tier 3 với cam kết uptime cao, an ninh vật lý 24/7 và đường truyền dự phòng.",
    features: [
      "EcoDC đạt chuẩn Tier 3 (uptime 99.982%)",
      "Hệ thống làm mát, PCCC, an ninh vật lý 24/7",
      "Kết nối Internet dự phòng N+1",
      "Quản trị từ xa, smart hands hỗ trợ tại chỗ",
    ],
    url: "https://www.hitc.vn/dich-vu-du-lieu/",
    tags: ["data center", "colocation", "tier 3"],
  },
  {
    id: "rack",
    title: "Thuê tủ Rack",
    category: "data",
    summary:
      "Thuê nguyên tủ rack tại Data Center HITC, linh hoạt cấu hình điện, mạng, băng thông theo nhu cầu.",
    features: [
      "Tủ rack 42U/47U, nguồn AB dự phòng",
      "Băng thông Internet/Direct Internet linh hoạt",
      "Hỗ trợ thiết kế hạ tầng theo yêu cầu",
    ],
    url: "https://www.hitc.vn/dich-vu-du-lieu/",
  },
  {
    id: "dedicated-server",
    title: "Máy chủ vật lý (Dedicated Server)",
    category: "data",
    summary:
      "Cho thuê máy chủ vật lý cấu hình cao, triển khai nhanh, phù hợp workload tính toán hoặc cơ sở dữ liệu.",
    features: [
      "Cấu hình Xeon mới, SSD NVMe",
      "Triển khai trong 24–72h",
      "Quản trị, giám sát, sao lưu trọn gói",
    ],
    url: "https://www.hitc.vn/dich-vu-du-lieu/",
  },
  {
    id: "ops-management",
    title: "Quản trị vận hành",
    category: "data",
    summary:
      "Đội ngũ kỹ sư vận hành 24/7, theo dõi và xử lý sự cố hệ thống của khách hàng tại Data Center.",
    features: ["NOC 24/7", "SLA cam kết", "Báo cáo định kỳ"],
    url: "https://www.hitc.vn/dich-vu-du-lieu/",
  },
  {
    id: "ftth",
    title: "Internet cáp quang FTTH",
    category: "internet",
    summary:
      "Đường truyền cáp quang FTTH cho doanh nghiệp, băng thông ổn định, hỗ trợ IPv4/IPv6.",
    features: ["Băng thông cam kết", "SLA doanh nghiệp", "Hỗ trợ kỹ thuật 24/7"],
    url: "https://www.hitc.vn/dich-vu-internet-truyen-dan-2/",
  },
  {
    id: "ill",
    title: "Internet Leased Line (ILL)",
    category: "internet",
    summary:
      "Kênh Internet riêng tốc độ cam kết 1:1, lý tưởng cho doanh nghiệp cần độ trễ thấp và ổn định cao.",
    features: ["Cam kết 1:1", "IP tĩnh", "Đường truyền dự phòng"],
    url: "https://www.hitc.vn/dich-vu-internet-truyen-dan-2/",
  },
  {
    id: "p2p",
    title: "Kênh truyền P2P",
    category: "internet",
    summary:
      "Kết nối điểm–điểm tốc độ cao giữa hai địa điểm của doanh nghiệp, bảo mật trên hạ tầng truyền dẫn của HITC.",
    features: ["Latency thấp", "Tốc độ tuỳ chỉnh", "Bảo mật lớp 2"],
    url: "https://www.hitc.vn/dich-vu-internet-truyen-dan-2/",
  },
  {
    id: "vpn-mpls",
    title: "VPN MPLS",
    category: "internet",
    summary:
      "Mạng riêng ảo trên nền MPLS, kết nối đa chi nhánh với QoS, định tuyến linh hoạt.",
    features: ["Đa chi nhánh", "QoS cho thoại/video", "Quản trị tập trung"],
    url: "https://www.hitc.vn/dich-vu-internet-truyen-dan-2/",
  },
  {
    id: "iplc",
    title: "IPLC quốc tế",
    category: "internet",
    summary:
      "Kênh truyền dữ liệu quốc tế chuyên dụng qua 07 hướng kết nối, phục vụ doanh nghiệp đa quốc gia.",
    features: ["07 hướng quốc tế", "Latency tối ưu", "SLA cao"],
    url: "https://www.hitc.vn/dich-vu-internet-truyen-dan-2/",
  },
  {
    id: "sun-vm",
    title: "Sun VM — Public Cloud Server",
    category: "cloud",
    summary:
      "Máy chủ ảo trên Sunteco Public Cloud: self-service qua portal, scale linh hoạt, billing theo giờ, hạ tầng đặt tại EcoDC Tier 3 Việt Nam.",
    features: [
      "Portal self-service tạo VM trong < 60 giây",
      "Tuỳ chọn CPU/RAM/Disk linh hoạt, scale up/down nóng",
      "Snapshot, image, security group built-in",
      "Đặt tại Data Center EcoDC Tier 3 trong nước (low latency)",
      "SLA 99.95% uptime",
    ],
    idealFor: [
      "Startup & SME cần triển khai nhanh, chi phí thấp",
      "Web app, app server, môi trường dev/test",
      "Khách hàng cần data residency Việt Nam",
    ],
    sla: "99.95%",
    pricingModel: "Pay-as-you-go (theo giờ) hoặc reserved tháng/năm",
    url: "https://sunteco.vn/",
    tags: ["public cloud", "vm", "iaas"],
  },
  {
    id: "private-cloud",
    title: "Private Cloud",
    category: "cloud",
    summary:
      "Hạ tầng cloud riêng dedicated cho doanh nghiệp, tài nguyên cô lập hoàn toàn, đáp ứng yêu cầu compliance ngành tài chính, ngân hàng, y tế.",
    features: [
      "Tài nguyên compute/storage/network dành riêng",
      "Hypervisor chuẩn VMware/OpenStack tuỳ chọn",
      "Tuỳ biến SLA, RPO/RTO theo yêu cầu",
      "Hỗ trợ HA, DR site-to-site",
      "Tách biệt mạng vật lý, đáp ứng PCI-DSS, ISO 27001",
    ],
    idealFor: [
      "Ngân hàng, công ty chứng khoán, fintech (PCI-DSS)",
      "Bệnh viện, cơ quan nhà nước (data sovereignty)",
      "Doanh nghiệp lớn workload nhạy cảm",
    ],
    sla: "99.99% (tuỳ gói)",
    url: "https://www.hitc.vn/dich-vu-cloud/",
    tags: ["private cloud", "dedicated", "compliance"],
  },
  {
    id: "sun-kubernetes",
    title: "Sun Kubernetes Service — Managed K8s",
    category: "cloud",
    summary:
      "Cụm Kubernetes managed enterprise-grade: control plane vận hành sẵn, worker node auto-scale, tích hợp registry, monitoring, logging.",
    features: [
      "Control plane HA quản trị bởi Sunteco, free auto-upgrade",
      "Cluster autoscaler + HPA cho workload",
      "Tích hợp Sun Container Registry & Sun Monitor",
      "CNI, ingress controller, cert-manager preset",
      "Hỗ trợ GPU nodepool cho AI workload",
    ],
    idealFor: [
      "Đội DevOps muốn dùng K8s mà không quản trị control plane",
      "Microservices, AI/ML workload, batch job",
      "Migration từ on-prem K8s sang managed",
    ],
    sla: "99.95% control plane",
    pricingModel: "Tính theo worker node (compute) — control plane miễn phí",
    url: "https://sunteco.vn/",
    tags: ["k8s", "kubernetes", "container", "devops"],
  },
  {
    id: "sun-container",
    title: "Sun Container Service — Serverless Container",
    category: "cloud",
    summary:
      "Nền tảng chạy container không cần quản trị server — đẩy image lên là chạy, scale-to-zero, billing theo CPU/RAM/giây sử dụng thực tế.",
    features: [
      "Deploy container từ image trong < 10 giây",
      "Scale-to-zero khi không có traffic (tiết kiệm chi phí)",
      "Cold start tối ưu (< 1s với image warm)",
      "Built-in HTTPS, custom domain, env vars/secrets",
      "Tích hợp Sun Container Registry và CI/CD",
    ],
    idealFor: [
      "Microservices, REST API, webhook handler",
      "Workload traffic biến động mạnh (event-driven)",
      "Team nhỏ không có DevOps chuyên trách",
    ],
    pricingModel: "Theo CPU-second + RAM-second + request count",
    url: "https://sunteco.vn/",
    tags: ["serverless", "container", "faas"],
  },
  {
    id: "sun-s3",
    title: "Sun S3 — Object Storage",
    category: "cloud",
    summary:
      "Lưu trữ object dung lượng không giới hạn, tương thích S3 API, độ bền 11×9, dùng cho backup, media, data lake, static asset.",
    features: [
      "100% S3 API compatible — dùng SDK aws-sdk, mc, rclone không sửa code",
      "Độ bền 99.999999999% (11×9)",
      "Versioning, lifecycle policy, pre-signed URL",
      "Tier storage: standard / infrequent / archive",
      "Không tính phí egress nội bộ Sunteco",
    ],
    idealFor: [
      "Backup target cho Acronis / Veeam",
      "Lưu media (ảnh/video) cho web/mobile app",
      "Data lake cho analytics & AI training",
    ],
    sla: "99.9% availability, 11×9 durability",
    pricingModel: "Theo GB/tháng + GB egress ra Internet",
    url: "https://sunteco.vn/",
    tags: ["s3", "object storage", "backup", "media"],
  },
  {
    id: "sun-database",
    title: "Sun Database — Managed DBaaS",
    category: "cloud",
    summary:
      "Quản trị cơ sở dữ liệu trọn gói: MySQL, PostgreSQL, MongoDB, Redis — auto backup, HA, monitoring, không cần DBA inhouse.",
    features: [
      "Hỗ trợ MySQL, PostgreSQL, MongoDB, Redis (lựa chọn engine)",
      "Daily auto-backup + point-in-time recovery",
      "HA active-passive với failover < 30s",
      "Monitoring metric/slow-query qua dashboard",
      "Patch security tự động trong cửa sổ bảo trì",
    ],
    idealFor: [
      "App cần DB production-grade nhưng không có DBA",
      "Workload OLTP, session store, cache",
      "Team muốn loại bỏ vận hành DB",
    ],
    sla: "99.95% (HA tier)",
    url: "https://sunteco.vn/",
    tags: ["database", "dbaas", "mysql", "postgresql", "mongodb", "redis"],
  },
  {
    id: "sun-load-balancer",
    title: "Sun Load Balancer",
    category: "cloud",
    summary:
      "Cân bằng tải L4/L7 cho ứng dụng web, gRPC, TCP. Tích hợp SSL termination, health check, sticky session.",
    features: [
      "L4 (TCP/UDP) và L7 (HTTP/HTTPS) load balancing",
      "SSL termination, TLS 1.3, ACME tự động",
      "Health check chủ động, auto remove unhealthy",
      "Sticky session, weighted routing",
    ],
    idealFor: [
      "App cần phân tải đa instance",
      "Public API cần HTTPS managed",
      "Blue/green hoặc canary deployment",
    ],
    url: "https://sunteco.vn/",
    tags: ["load balancer", "lb", "ingress"],
  },
  {
    id: "sun-cdn",
    title: "Sun CDN — Content Delivery Network",
    category: "cloud",
    summary:
      "Mạng phân phối nội dung toàn cầu (powered by CDNetworks), tăng tốc website/app, giảm tải origin, chống DDoS lớp 7.",
    features: [
      "200+ PoP toàn cầu, edge tại Việt Nam",
      "HTTPS, HTTP/2, HTTP/3 (QUIC)",
      "Cache rule linh hoạt, purge tức thì",
      "WAF & rate-limit chống DDoS L7",
    ],
    idealFor: [
      "Website/app phục vụ user toàn cầu",
      "Video on-demand, streaming, file lớn",
      "Giảm chi phí egress từ origin",
    ],
    pricingModel: "Theo GB traffic + số request",
    url: "https://sunteco.vn/",
    tags: ["cdn", "edge", "ddos"],
  },
  {
    id: "sun-kafka",
    title: "Sun Kafka Highway",
    category: "cloud",
    summary:
      "Apache Kafka managed: streaming dữ liệu throughput cao, durability tốt, dùng cho event-driven architecture & data pipeline.",
    features: [
      "Kafka cluster HA managed full",
      "Schema registry, Kafka Connect tuỳ chọn",
      "Monitoring topic/partition/lag",
      "Tích hợp tốt với Sun Database & Sun S3",
    ],
    idealFor: [
      "Event-driven microservices",
      "Data pipeline / CDC từ DB sang data lake",
      "Real-time analytics, log aggregation",
    ],
    url: "https://sunteco.vn/",
    tags: ["kafka", "streaming", "event", "pubsub"],
  },
  {
    id: "sun-monitor",
    title: "Sun Monitor",
    category: "cloud",
    summary:
      "Dashboard giám sát tài nguyên & hạ tầng Sunteco: metric, log, alert đa kênh (email, webhook, Telegram).",
    features: [
      "Metric CPU/RAM/Disk/Network theo thời gian thực",
      "Custom dashboard, custom metric qua API",
      "Alert rule, escalation, on-call rotation",
      "Log aggregation, full-text search",
    ],
    idealFor: [
      "Mọi khách hàng Sunteco cần observability",
      "Team SRE/DevOps cần single pane of glass",
    ],
    url: "https://sunteco.vn/",
    tags: ["monitoring", "observability", "alerting"],
  },
  {
    id: "sun-drive",
    title: "Sun Drive — Enterprise File Storage",
    category: "cloud",
    summary:
      "Lưu trữ file dùng chung cho doanh nghiệp, chia sẻ qua web/app/SFTP, phân quyền theo team, audit log.",
    features: [
      "Web UI + mobile + SFTP access",
      "Phân quyền theo user/group/folder",
      "Audit log truy cập, versioning file",
      "Mã hoá at-rest và in-transit",
    ],
    idealFor: [
      "Doanh nghiệp thay thế file server on-prem",
      "Đội nội bộ chia sẻ tài liệu, design asset",
    ],
    url: "https://sunteco.vn/",
    tags: ["file storage", "nas", "sharing"],
  },
  {
    id: "acronis",
    title: "Acronis Data Protection",
    category: "cloud",
    summary:
      "Giải pháp backup & cyber protection toàn diện cho endpoint, server, M365/Google Workspace, workload cloud — chống ransomware AI-powered.",
    features: [
      "Backup image-level và file-level cho mọi workload",
      "Bảo vệ M365 / Google Workspace (email, OneDrive, SharePoint)",
      "Anti-ransomware Active Protection AI",
      "Khôi phục bare-metal hoặc tới VM khác (DR)",
      "Quản trị tập trung qua portal multi-tenant",
    ],
    idealFor: [
      "Doanh nghiệp 50–5000 endpoint cần backup tập trung",
      "Khách hàng đã có server vật lý/VM cần DR",
      "Tổ chức cần tuân thủ backup theo quy định",
    ],
    sla: "RPO 15 phút, RTO 1h (tuỳ gói)",
    url: "https://www.hitc.vn/dich-vu-cloud/",
    tags: ["backup", "dr", "ransomware", "endpoint"],
  },
  {
    id: "hybrid-cloud",
    title: "Hybrid Cloud",
    category: "cloud",
    summary:
      "Kết nối liền mạch giữa on-premise và Sunteco public/private cloud qua kênh riêng L2/L3, workload portability, quản trị một cửa.",
    features: [
      "Direct Connect L2 từ DC khách hàng vào Sunteco",
      "VPN site-to-site IPSec dự phòng",
      "Workload portability (V2V, P2V migration)",
      "Quản trị tập trung qua portal duy nhất",
      "Tối ưu chi phí: workload ổn định on-prem, burst lên cloud",
    ],
    idealFor: [
      "DN có hạ tầng on-prem hiện hữu chưa muốn bỏ",
      "Workload đặc thù phải on-prem (DB lớn, license cứng)",
      "Chiến lược cloud-smart, không cloud-only",
    ],
    url: "https://www.hitc.vn/dich-vu-cloud/",
    tags: ["hybrid", "direct connect", "migration"],
  },
  {
    id: "sun-container-registry",
    title: "Sun Container Registry",
    category: "cloud",
    summary:
      "Container image registry private, tương thích Docker/OCI, scan vulnerability, replication, retention policy.",
    features: [
      "Docker & OCI compatible",
      "Vulnerability scan tự động (Trivy)",
      "Retention policy, immutable tag",
      "Replication đa region",
      "Tích hợp Sun K8s & Sun Container",
    ],
    idealFor: [
      "Team DevOps cần registry riêng",
      "Compliance không cho push image ra public registry",
    ],
    url: "https://sunteco.vn/",
    tags: ["registry", "container", "image"],
  },
  {
    id: "workbase",
    title: "Workbase",
    category: "digital",
    summary:
      "Nền tảng làm việc số low-code/no-code, giúp doanh nghiệp số hoá quy trình và nâng cao hiệu suất vận hành.",
    features: [
      "Low-code/no-code builder",
      "Tự động hoá quy trình (workflow)",
      "Tích hợp dữ liệu nội bộ và bên thứ ba",
    ],
    url: "https://www.hitc.vn/nen-tang-lam-viec-workbase/",
  },
  {
    id: "e-government",
    title: "E-Government",
    category: "digital",
    summary:
      "Giải pháp chính phủ điện tử: cổng dịch vụ công, quản lý văn bản, một cửa điện tử.",
    features: ["Cổng DVC", "Quản lý văn bản", "Tích hợp CSDL quốc gia"],
    url: "https://www.hitc.vn/dich-vu-so/",
  },
  {
    id: "aiot",
    title: "AIOT",
    category: "digital",
    summary:
      "Giải pháp kết hợp AI và IoT: camera AI, giám sát thông minh, phân tích dữ liệu cảm biến.",
    features: ["Camera AI", "IoT gateway", "Phân tích dữ liệu thời gian thực"],
    url: "https://www.hitc.vn/dich-vu-so/",
  },
  {
    id: "1800-1900",
    title: "Đầu số 1800/1900",
    category: "voice",
    summary:
      "Dịch vụ tổng đài đầu số 1800 (miễn phí cuộc gọi) và 1900 (thu phí), phục vụ chăm sóc khách hàng quy mô lớn.",
    features: ["Định tuyến thông minh", "Báo cáo cuộc gọi", "Tích hợp CRM"],
    url: "https://www.hitc.vn/dich-vu-thoai-2/",
  },
  {
    id: "voip",
    title: "VoIP & SIP Trunk",
    category: "voice",
    summary:
      "Dịch vụ thoại trên nền IP, SIP Trunk kết nối tổng đài nội bộ tiết kiệm chi phí.",
    features: ["SIP Trunk linh hoạt", "Chất lượng thoại HD", "Tích hợp tổng đài hiện hữu"],
    url: "https://www.hitc.vn/dich-vu-thoai-2/",
  },
  {
    id: "cloud-pbx",
    title: "Tổng đài ảo (Cloud PBX)",
    category: "voice",
    summary:
      "Tổng đài đặt trên cloud, không cần đầu tư phần cứng, quản trị qua web, mở rộng linh hoạt.",
    features: ["IVR, ACD", "Ghi âm cuộc gọi", "Quản trị web"],
    url: "https://www.hitc.vn/dich-vu-thoai-2/",
  },
  {
    id: "brandname-call",
    title: "Cuộc gọi thương hiệu (Voice Brandname)",
    category: "voice",
    summary:
      "Hiển thị tên thương hiệu khi gọi đến khách hàng, tăng tỉ lệ bắt máy và bảo vệ uy tín thương hiệu.",
    features: ["Hiển thị brand", "Chống giả mạo", "Báo cáo chiến dịch"],
    url: "https://www.hitc.vn/dich-vu-thoai-2/",
  },
  {
    id: "omni-channel",
    title: "Giao tiếp đa kênh",
    category: "voice",
    summary:
      "Hợp nhất voice, SMS, Zalo, email vào một nền tảng duy nhất cho đội ngũ CSKH/Sales.",
    features: ["Đa kênh", "Lịch sử khách hàng hợp nhất", "Báo cáo SLA"],
    url: "https://www.hitc.vn/dich-vu-thoai-2/",
  },
];

export const HITC_CATEGORIES: Record<
  ServiceCategory,
  { label: string; icon: string; description: string }
> = {
  data: {
    label: "Dịch vụ Dữ liệu",
    icon: "🗄️",
    description:
      "Data Center EcoDC Tier 3, colocation, rack, dedicated server, vận hành 24/7.",
  },
  internet: {
    label: "Internet & Truyền dẫn",
    icon: "🌐",
    description:
      "15.000+ km cáp quang Bắc–Nam, 07 hướng quốc tế, FTTH/ILL/P2P/VPN-MPLS/IPLC.",
  },
  cloud: {
    label: "Dịch vụ Cloud",
    icon: "☁️",
    description:
      "Public/Private/Hybrid Cloud, Managed K8s, Serverless, Object Storage, Acronis.",
  },
  digital: {
    label: "Dịch vụ Số",
    icon: "✨",
    description: "Workbase low-code, E-Government, AIOT.",
  },
  voice: {
    label: "Dịch vụ Thoại",
    icon: "📞",
    description: "1800/1900, VoIP, SIP Trunk, Cloud PBX, Voice Brandname, đa kênh.",
  },
};

export const HITC_DATA_CENTER = {
  name: "EcoDC",
  tier: "Tier 3",
  highlights: [
    "Uptime 99.982% theo chuẩn Uptime Institute Tier 3",
    "Hệ thống điện 2N, làm mát N+1",
    "An ninh vật lý 24/7, kiểm soát truy cập đa lớp",
    "Kết nối Internet & truyền dẫn dự phòng",
    "Tuân thủ ISO 27001 cho hệ thống quản lý an toàn thông tin",
  ],
};

export const HITC_CONTACT = {
  website: "https://www.hitc.vn",
  hotline: "1800 6736",
  email: "info@hitc.vn",
  address: "Tầng 16, Tòa nhà HITC, 239 Xuân Thuỷ, Cầu Giấy, Hà Nội",
  sunteco: "https://sunteco.vn",
};

export interface USP {
  id: string;
  title: string;
  icon: string;
  pitch: string;
  proof: string[];
}

export const HITC_POSITIONING =
  "HITC không chỉ là nhà cung cấp dịch vụ viễn thông, mà là đối tác hạ tầng số và giải pháp công nghệ toàn diện cho doanh nghiệp — hạ tầng mạnh, kinh nghiệm lâu năm, hệ sinh thái dịch vụ đa dạng và khả năng đồng hành trong quá trình chuyển đổi số.";

export const HITC_USPS: USP[] = [
  {
    id: "infrastructure",
    title: "Hạ tầng số mạnh và ổn định",
    icon: "🏗️",
    pitch:
      "Sở hữu hạ tầng truyền dẫn, Data Center và Cloud do HITC tự đầu tư & vận hành — phù hợp doanh nghiệp cần kết nối ổn định, lưu trữ dữ liệu an toàn, hệ thống chạy liên tục.",
    proof: [
      "Data Center EcoDC đạt chuẩn Uptime Institute Tier III",
      "15.000+ km cáp quang đường trục Bắc – Nam",
      "07 hướng kết nối quốc tế đa hướng dự phòng",
    ],
  },
  {
    id: "ecosystem",
    title: "Hệ sinh thái dịch vụ đầy đủ cho doanh nghiệp",
    icon: "🧩",
    pitch:
      "Khách hàng có thể sử dụng nhiều nhóm dịch vụ trong cùng một hệ sinh thái — giảm phụ thuộc vào nhiều nhà cung cấp rời rạc, thống nhất hợp đồng & SLA, một đầu mối hỗ trợ.",
    proof: [
      "Internet & Truyền dẫn (FTTH, ILL, P2P, VPN-MPLS, IPLC)",
      "Data Center & Cloud (EcoDC, Sun VM/K8s/S3/DB...)",
      "Dịch vụ Thoại (1800/1900, Cloud PBX, Voice Brandname, đa kênh)",
      "Dịch vụ Số (Workbase low-code, E-Government, AIOT)",
    ],
  },
  {
    id: "experience",
    title: "Kinh nghiệm và độ tin cậy thương hiệu",
    icon: "🏅",
    pitch:
      "Thành lập từ 2007, gần 20 năm hoạt động trong viễn thông cố định, Internet, VoIP, điện thoại đường dài trong nước & quốc tế — đối tác có kinh nghiệm vận hành thực tế.",
    proof: [
      "Thành lập năm 2007",
      "Vận hành liên tục các dịch vụ viễn thông trọng yếu",
      "Đội ngũ kỹ sư vận hành 24/7, NOC chuyên trách",
    ],
  },
  {
    id: "enterprise-fit",
    title: "Phù hợp với khách hàng doanh nghiệp",
    icon: "🏢",
    pitch:
      "Định vị B2B rõ ràng — sản phẩm, hợp đồng, SLA, hỗ trợ được thiết kế cho doanh nghiệp trong nước & quốc tế, không phải retail.",
    proof: [
      "1.000+ khách hàng doanh nghiệp đang sử dụng dịch vụ",
      "Hợp đồng B2B với SLA cam kết và hỗ trợ chuyên trách",
      "Phục vụ cả khách hàng nội địa và đa quốc gia",
    ],
  },
  {
    id: "secure-cost",
    title: "An toàn, bảo mật và tối ưu chi phí",
    icon: "🛡️",
    pitch:
      "Giải pháp hạ tầng truyền dẫn, Data Center, Cloud thiết kế theo hướng an toàn – bảo mật – tối ưu chi phí, phù hợp khách hàng cần kiểm soát ngân sách mà vẫn đảm bảo chất lượng.",
    proof: [
      "EcoDC Tier 3, ISO 27001, an ninh vật lý 24/7",
      "Acronis cyber protection chống ransomware AI",
      "Pay-as-you-go cloud, hybrid model tối ưu TCO",
    ],
  },
];

export const HITC_PARTNERS = [
  "Cisco",
  "VMware",
  "Acronis",
  "Microsoft",
  "Huawei",
  "Dell EMC",
];

export function findServices(query: {
  category?: ServiceCategory;
  keyword?: string;
  limit?: number;
}): Service[] {
  const { category, keyword, limit = 6 } = query;
  const k = keyword?.toLowerCase().trim();
  return HITC_SERVICES.filter((s) => {
    if (category && s.category !== category) return false;
    if (!k) return true;
    return (
      s.title.toLowerCase().includes(k) ||
      s.summary.toLowerCase().includes(k) ||
      s.features.some((f) => f.toLowerCase().includes(k)) ||
      (s.tags ?? []).some((t) => t.toLowerCase().includes(k))
    );
  }).slice(0, limit);
}

export function getServiceById(id: string): Service | undefined {
  return HITC_SERVICES.find((s) => s.id === id);
}

export function recommendServices(goal: string): Service[] {
  const g = goal.toLowerCase();
  const score = (s: Service) => {
    let pts = 0;
    const hay = (s.title + " " + s.summary + " " + s.features.join(" ")).toLowerCase();
    for (const kw of g.split(/\s+/)) {
      if (kw.length < 3) continue;
      if (hay.includes(kw)) pts += 2;
    }
    return pts;
  };
  return [...HITC_SERVICES]
    .map((s) => ({ s, p: score(s) }))
    .filter((x) => x.p > 0)
    .sort((a, b) => b.p - a.p)
    .slice(0, 4)
    .map((x) => x.s);
}
