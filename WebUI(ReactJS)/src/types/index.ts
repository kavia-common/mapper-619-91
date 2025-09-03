// User and Authentication Types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  permissions: Permission[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  NETWORK_ENGINEER = 'network_engineer',
  SERVICE_DESIGNER = 'service_designer',
  OPERATOR = 'operator',
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

// Device and Network Types
export interface Device {
  id: string;
  name: string;
  hostname: string;
  ipAddress: string;
  port: number;
  vendor: string;
  deviceType: string;
  protocol: DeviceProtocol;
  credentials: DeviceCredentials;
  connectionStatus: ConnectionStatus;
  yangModels: YangModel[];
  capabilities: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum DeviceProtocol {
  NETCONF = 'netconf',
  CLI = 'cli',
  RESTCONF = 'restconf',
}

export enum ConnectionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  ERROR = 'error',
}

export interface DeviceCredentials {
  username: string;
  password?: string;
  privateKey?: string;
  publicKey?: string;
}

// YANG Model Types
export interface YangModel {
  id: string;
  name: string;
  namespace: string;
  version: string;
  revision: string;
  description?: string;
  organization?: string;
  contact?: string;
  reference?: string;
  content: string;
  dependencies: string[];
  modules: YangModule[];
  deviceId?: string;
  isImported: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface YangModule {
  name: string;
  prefix?: string;
  namespace: string;
  description?: string;
  containers: YangContainer[];
  leafs: YangLeaf[];
  lists: YangList[];
  choices: YangChoice[];
  rpcs: YangRpc[];
  notifications: YangNotification[];
}

export interface YangContainer {
  name: string;
  description?: string;
  path: string;
  presence?: boolean;
  config?: boolean;
  children: YangNode[];
}

export interface YangLeaf {
  name: string;
  description?: string;
  type: YangType;
  path: string;
  config?: boolean;
  mandatory?: boolean;
  defaultValue?: any;
  units?: string;
}

export interface YangList {
  name: string;
  description?: string;
  path: string;
  keys: string[];
  config?: boolean;
  children: YangNode[];
}

export interface YangChoice {
  name: string;
  description?: string;
  path: string;
  mandatory?: boolean;
  cases: YangCase[];
}

export interface YangCase {
  name: string;
  description?: string;
  children: YangNode[];
}

export interface YangRpc {
  name: string;
  description?: string;
  input?: YangNode[];
  output?: YangNode[];
}

export interface YangNotification {
  name: string;
  description?: string;
  children: YangNode[];
}

export interface YangType {
  name: string;
  base?: string;
  restrictions?: YangRestriction[];
  enumValues?: YangEnumValue[];
  range?: string;
  length?: string;
  pattern?: string;
}

export interface YangRestriction {
  type: string;
  value: string;
}

export interface YangEnumValue {
  name: string;
  value?: number;
  description?: string;
}

export type YangNode = YangContainer | YangLeaf | YangList | YangChoice;

// API Schema Types
export interface ApiSchema {
  id: string;
  name: string;
  version: string;
  description?: string;
  baseUrl: string;
  paths: ApiPath[];
  models: ApiModel[];
  security: ApiSecurity[];
  tags: ApiTag[];
  isPublished: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiPath {
  path: string;
  method: HttpMethod;
  operationId: string;
  summary?: string;
  description?: string;
  tags: string[];
  parameters: ApiParameter[];
  requestBody?: ApiRequestBody;
  responses: ApiResponse[];
  security?: ApiSecurity[];
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface ApiParameter {
  name: string;
  in: 'query' | 'path' | 'header' | 'cookie';
  description?: string;
  required: boolean;
  schema: JsonSchema;
}

export interface ApiRequestBody {
  description?: string;
  required: boolean;
  content: ApiContent[];
}

export interface ApiResponse {
  statusCode: number;
  description: string;
  content?: ApiContent[];
  headers?: ApiHeader[];
}

export interface ApiContent {
  mediaType: string;
  schema: JsonSchema;
}

export interface ApiHeader {
  name: string;
  description?: string;
  schema: JsonSchema;
}

export interface ApiModel {
  name: string;
  description?: string;
  schema: JsonSchema;
}

export interface ApiSecurity {
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
  scheme?: string;
  bearerFormat?: string;
  flows?: any;
  openIdConnectUrl?: string;
}

export interface ApiTag {
  name: string;
  description?: string;
}

export interface JsonSchema {
  type: string;
  properties?: Record<string, JsonSchema>;
  items?: JsonSchema;
  required?: string[];
  enum?: any[];
  format?: string;
  pattern?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  description?: string;
  example?: any;
  default?: any;
}

// Mapping Types
export interface Mapping {
  id: string;
  name: string;
  description?: string;
  sourceSchema: YangModel;
  targetSchema: ApiSchema;
  mappingRules: MappingRule[];
  transformations: Transformation[];
  validationRules: ValidationRule[];
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MappingRule {
  id: string;
  sourcePath: string;
  targetPath: string;
  transformation?: string;
  condition?: string;
  priority: number;
  isActive: boolean;
}

export interface Transformation {
  id: string;
  name: string;
  type: TransformationType;
  expression: string;
  parameters: Record<string, any>;
}

export enum TransformationType {
  FIELD_MAPPING = 'field_mapping',
  VALUE_TRANSFORMATION = 'value_transformation',
  CONDITIONAL = 'conditional',
  AGGREGATION = 'aggregation',
  CUSTOM = 'custom',
}

export interface ValidationRule {
  id: string;
  name: string;
  type: ValidationType;
  expression: string;
  errorMessage: string;
  isActive: boolean;
}

export enum ValidationType {
  REQUIRED = 'required',
  FORMAT = 'format',
  RANGE = 'range',
  CUSTOM = 'custom',
}

// Template Types
export interface Template {
  id: string;
  name: string;
  description?: string;
  vendor: string;
  deviceType: string;
  templateType: TemplateType;
  content: string;
  variables: TemplateVariable[];
  mapping: Mapping;
  testCases: TemplateTestCase[];
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum TemplateType {
  JINJA2 = 'jinja2',
  VELOCITY = 'velocity',
  FREEMARKER = 'freemarker',
  MUSTACHE = 'mustache',
}

export interface TemplateVariable {
  name: string;
  type: string;
  description?: string;
  defaultValue?: any;
  required: boolean;
  validation?: string;
}

export interface TemplateTestCase {
  id: string;
  name: string;
  description?: string;
  inputData: Record<string, any>;
  expectedOutput: string;
  isActive: boolean;
}

// Service Types
export interface Service {
  id: string;
  name: string;
  description?: string;
  version: string;
  serviceType: string;
  endpoints: ServiceEndpoint[];
  dependencies: string[];
  configuration: ServiceConfiguration;
  deploymentStatus: DeploymentStatus;
  healthStatus: HealthStatus;
  metrics: ServiceMetrics;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceEndpoint {
  id: string;
  name: string;
  url: string;
  method: HttpMethod;
  description?: string;
  isActive: boolean;
}

export interface ServiceConfiguration {
  devices: string[];
  templates: string[];
  mappings: string[];
  environment: Record<string, any>;
  resources: ResourceRequirements;
}

export interface ResourceRequirements {
  cpu: string;
  memory: string;
  storage: string;
}

export enum DeploymentStatus {
  PENDING = 'pending',
  DEPLOYING = 'deploying',
  DEPLOYED = 'deployed',
  FAILED = 'failed',
  STOPPED = 'stopped',
}

export enum HealthStatus {
  HEALTHY = 'healthy',
  UNHEALTHY = 'unhealthy',
  DEGRADED = 'degraded',
  UNKNOWN = 'unknown',
}

export interface ServiceMetrics {
  uptime: number;
  responseTime: number;
  errorRate: number;
  throughput: number;
  lastChecked: Date;
}

// Notification Types
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  severity: NotificationSeverity;
  category: string;
  userId?: string;
  isRead: boolean;
  isGlobal: boolean;
  actions?: NotificationAction[];
  metadata?: Record<string, any>;
  expiresAt?: Date;
  createdAt: Date;
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  SYSTEM = 'system',
}

export enum NotificationSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface NotificationAction {
  id: string;
  label: string;
  action: string;
  url?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  pagination?: PaginationInfo;
  metadata?: Record<string, any>;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// UI State Types
export interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
}

export interface ErrorState {
  error: string | null;
  errorDetails?: any;
}

export interface ModalState {
  isOpen: boolean;
  type?: string;
  data?: any;
}

export interface FilterState {
  searchTerm: string;
  filters: Record<string, any>;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  validation?: any;
  options?: SelectOption[];
  disabled?: boolean;
}

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}

// File Types
export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

// Theme Types
export interface Theme {
  colors: Record<string, string>;
  fonts: Record<string, string>;
  spacing: Record<string, string>;
  breakpoints: Record<string, string>;
}

// Route Types
export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  requiresAuth?: boolean;
  roles?: UserRole[];
  permissions?: string[];
}
